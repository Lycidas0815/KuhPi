/*
  BME280.js

  I2C driver for the BME280 Humidity, Barometric Pressure, Temperature Sensor
*/

'use strict';

class BME280 {

  constructor(i2cBusNo, i2cAddress) {
    let i2c = require('i2c-bus');
    this.i2cBus = i2c.openSync(i2cBusNo);
    this.i2cAddress = i2cAddress ? i2cAddress : 0x77;

    this.I2C_ADDRESS_B   = 0x76;
    this.I2C_ADDRESS_A   = 0x77;
    this.CHIP_ID         = 0x58;
    this.CHIP_ID_BME280  = 0x60;

    this.REGISTER_DIG_T1 = 0x88;
    this.REGISTER_DIG_T2 = 0x8A;
    this.REGISTER_DIG_T3 = 0x8C;

    this.REGISTER_DIG_P1 = 0x8E;
    this.REGISTER_DIG_P2 = 0x90;
    this.REGISTER_DIG_P3 = 0x92;
    this.REGISTER_DIG_P4 = 0x94;
    this.REGISTER_DIG_P5 = 0x96;
    this.REGISTER_DIG_P6 = 0x98;
    this.REGISTER_DIG_P7 = 0x9A;
    this.REGISTER_DIG_P8 = 0x9C;
    this.REGISTER_DIG_P9 = 0x9E;

    this.REGISTER_DIG_H1 = 0xA1;
    this.REGISTER_DIG_H2 = 0xE1;
    this.REGISTER_DIG_H3 = 0xE3;
    this.REGISTER_DIG_H4 = 0xE4;
    this.REGISTER_DIG_H5 = 0xE5;
    this.REGISTER_DIG_H6 = 0xE7;

    this.REGISTER_CHIPID    = 0xD0;
    this.REGISTER_VERSION   = 0xD1;
    this.REGISTER_SOFTRESET = 0xE0;
    this.REGISTER_CAL26     = 0xE1; // R calibration stored in 0xE1-0xF

    this.REGISTER_CONTROL_HUM   = 0xF2;
    this.REGISTER_CONTROL       = 0xF4;
    this.REGISTER_CONFIG        = 0xF5;
    this.REGISTER_PRESSURE_DATA = 0xF7;
    this.REGISTER_TEMP_DATA     = 0xFA;
    this.REGISTER_HUMIDITY_DATA = 0xFD;
  }

  init() {
    return new Promise((resolve, reject) => {
      this.i2cBus.writeByte(this.i2cAddress, this.REGISTER_CHIPID, 0, err => {
        if(err) {
          return reject(err);
        }
        this.i2cBus.readByte(this.i2cAddress, this.REGISTER_CHIPID, (err, chipId) => {
          if(err) {
            return reject(err);
          }
          else if(chipId != this.CHIP_ID && chipId != this.CHIP_ID_BME280) {
            return reject(`Unexpected Chip ID: ${chipId}`);
          }
          else {
            console.log('Found BME280 chip id 0x' + chipId.toString(16));
            this.loadCalibration(function(err) {
              return err ? reject(err) : resolve(chipId);
            });
          }
        });
      });
    });
  }

  readSensorData() {
    let _this = this;
    return new Promise((resolve, reject) => {
      // Read temperature
      //
      // t_fine is required for both humidify and pressure regardless. Let's just read it all.
      //
      _this.i2cBus.readI2cBlock(_this.i2cAddress, _this.REGISTER_TEMP_DATA, 3, new Buffer(3), function(err, bytesRead, buffer) {
        if(err) {
          return reject(err);
        }
        let adc_T = BME280.uint20(buffer[0], buffer[1], buffer[2]);
        let var1 = ((((adc_T >> 3) - (_this.cal.dig_T1 << 1))) * _this.cal.dig_T2) >> 11;
        let var2  = (((((adc_T >> 4) - _this.cal.dig_T1) * ((adc_T >> 4) - _this.cal.dig_T1)) >> 12) * _this.cal.dig_T3) >> 14;
        let t_fine = var1 + var2;

        let temperature_C = ((t_fine * 5 + 128) >> 8) / 100;

        // Read humidity
        //
        _this.i2cBus.readI2cBlock(_this.i2cAddress, _this.REGISTER_HUMIDITY_DATA, 2, new Buffer(2), function(err, bytesRead, buffer) {
          if(err) {
            return reject(err);
          }
          let adc_H = BME280.uint16(buffer[0], buffer[1]);

          let h = t_fine - 76800;
          h = (adc_H - (_this.cal.dig_H4 * 64 + _this.cal.dig_H5 / 16384 * h)) *
              (_this.cal.dig_H2 / 65536 * (1 + _this.cal.dig_H6 / 67108864 * h * (1 + _this.cal.dig_H3 / 67108864 * h)));
          h = h * (1 - _this.cal.dig_H1 * h / 524288);

          let humidity = (h > 100) ? 100 : (h < 0 ? 0 : h);

          // Read pressure
          //
          _this.i2cBus.readI2cBlock(_this.i2cAddress, _this.REGISTER_PRESSURE_DATA, 24, new Buffer(24), function(err, bytesRead, buffer) {
            if(err) {
              return reject(err);
            }
            let adc_P = BME280.uint20(buffer[0], buffer[1], buffer[2]);
            let var1 = t_fine / 2 - 64000;
            let var2 = var1 * var1 * _this.cal.dig_P6 / 32768;
            var2 = var2 + var1 * _this.cal.dig_P5 * 2;
            var2 = var2 / 4 + _this.cal.dig_P4 * 65536;
            var1 = (_this.cal.dig_P3 * var1 * var1 / 524288 + _this.cal.dig_P2 * var1) / 524288;
            var1 = (1 + var1 / 32768) * _this.cal.dig_P1;

            let pressure_hPa = 0;

            if(var1 != 0) {
              let p = 1048576 - adc_P;
              p = ((p - var2 / 4096) * 6250) / var1;
              var1 = _this.cal.dig_P9 * p * p / 2147483648;
              var2 = p * _this.cal.dig_P8 / 32768;
              p = p + (var1 + var2 + _this.cal.dig_P7) / 16;

              pressure_hPa = p/100;
            }

            resolve({ temperature_C : temperature_C.toFixed(2),
                      temperature_F : (temperature_C * 9 / 5 + 32).toFixed(2),
                      humidity      : humidity.toFixed(2),
                      pressure_hPa  : pressure_hPa.toFixed(2),
                      pressure_inHg : (pressure_hPa * 0.02953).toFixed(2)
            });
          });
        });
      });
    });
  }

  loadCalibration(callback) {
    this.i2cBus.readI2cBlock(this.i2cAddress, this.REGISTER_DIG_T1, 24, new Buffer(24), (err, bytesRead, buffer) => {
      let h1   = this.i2cBus.readByteSync(this.i2cAddress, this.REGISTER_DIG_H1);
      let h2   = this.i2cBus.readWordSync(this.i2cAddress, this.REGISTER_DIG_H2);
      let h3   = this.i2cBus.readByteSync(this.i2cAddress, this.REGISTER_DIG_H3);
      let h4   = this.i2cBus.readByteSync(this.i2cAddress, this.REGISTER_DIG_H4);
      let h5   = this.i2cBus.readByteSync(this.i2cAddress, this.REGISTER_DIG_H5);
      let h5_1 = this.i2cBus.readByteSync(this.i2cAddress, this.REGISTER_DIG_H5 + 1);
      let h6   = this.i2cBus.readByteSync(this.i2cAddress, this.REGISTER_DIG_H6);

      this.cal = {
        dig_T1: BME280.uint16(buffer[1], buffer[0]),
        dig_T2: BME280.int16(buffer[3], buffer[2]),
        dig_T3: BME280.int16(buffer[5], buffer[4]),

        dig_P1: BME280.uint16(buffer[7], buffer[6]),
        dig_P2: BME280.int16(buffer[9], buffer[8]),
        dig_P3: BME280.int16(buffer[11], buffer[10]),
        dig_P4: BME280.int16(buffer[13], buffer[12]),
        dig_P5: BME280.int16(buffer[15], buffer[14]),
        dig_P6: BME280.int16(buffer[17], buffer[16]),
        dig_P7: BME280.int16(buffer[19], buffer[18]),
        dig_P8: BME280.int16(buffer[21], buffer[20]),
        dig_P9: BME280.int16(buffer[23], buffer[22]),

        dig_H1: h1,
        dig_H2: h2,
        dig_H3: h3,
        dig_H4: (h4 << 4) | (h5 & 0xF),
        dig_H5: (h5_1 << 4) | (h5 >> 4),
        dig_H6: h6
      };

      //console.log('BME280 cal = ' + JSON.stringify(this.cal, null, 2));
      this.i2cBus.writeByte(this.i2cAddress, this.REGISTER_CONTROL, 0x3F, err => callback(err));
    });
  }

  static int16(msb, lsb) {
    let val = BME280.uint16(msb, lsb);
    return val > 32767 ? (val - 65536) : val;
  }

  static uint16(msb, lsb) {
    return msb << 8 | lsb;
  }

  static uint20(msb, lsb, xlsb) {
    return ((msb << 8 | lsb) << 8 | xlsb) >> 4;
  }

}

module.exports = BME280;
