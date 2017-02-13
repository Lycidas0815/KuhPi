/*
  devices-rpi.js

  A direct hardware interface to our Rasbperry Pi devices.
*/

'use strict';

const LED_GPIO_OUTPUT = 23; // Pin 16 on the header (GPIO23)
const DHT22_1_GPIO_PIN = 17;
const DHT22_2_GPIO_PIN = 19;
const DS18B20_1_SENSOR_ID = "10-00080283a977";
const DS18B20_2_SENSOR_ID = "10-00080283a978";


const DevicesBase = require('./devices-base.js');
const deviceUtils = require('./device-utils.js');
const async       = require('async');
const Gpio        = require('onoff').Gpio;
const BME280      = require('bme280-sensor');
const DHT22       = require('./DHT22.js');
const DS18B20      = require('./ds18b20.js');
const TSL2561     = require('./TSL2561.js');
const SerialGPS   = require('./serial-gps.js');
const os          = require('os');

class DevicesRPi extends DevicesBase {

  constructor() {
    super();
    console.log('Creating DevicesRPi');

    this.led     = new Gpio(LED_GPIO_OUTPUT, 'out');
    this.bme280  = new BME280();
    this.dht22_1   = new DHT22(DHT22_1_GPIO_PIN);
    this.dht22_2   = new DHT22(DHT22_2_GPIO_PIN);
    this.ds18b20_1 = new DS18B20(DS18B20_1_SENSOR_ID);
    this.ds18b20_2 = new DS18B20(DS18B20_2_SENSOR_ID);
    this.tsl2561 = new TSL2561();
    this.gps     = new SerialGPS('/dev/ttyAMA0', 9600);

    this.bme280.init()
      .then((result) => console.log('BME280 initialization succeeded'))
      .catch((err) => console.error(`BME280 initialization failed: ${err}`));
  }

  ledOn() {
    console.log('DevicesRPi.ledOn()');
    return new Promise((resolve, reject) => this.led.write(1, (err) => err ? reject(err) : resolve('OK')));
  }

  ledOff() {
    console.log('DevicesRPi.ledOff()');
    return new Promise((resolve, reject) => this.led.write(0, (err) => err ? reject(err) : resolve('OK')));
  }

  readSensors() {
    console.log('DevicesRPi.readSensors()');

    return new Promise((resolve, reject) => {
      // Gather all of our data sources in parallel
      //
      async.parallel([

        (callback) => this.bme280.readSensorData()
          .then((data) => {
            data.temperature_F = BME280.convertCelciusToFahrenheit(data.temperature_C);
            data.pressure_inHg = BME280.convertHectopascalToInchesOfMercury(data.pressure_hPa);
            /*
            data.heatIndex_C = BME280.calculateHeatIndexCelcius(data.temperature_C, data.humidity);
            data.heatIndex_F = BME280.convertCelciusToFahrenheit(data.heatIndex_C);

            data.dewPoint_C = BME280.calculateDewPointCelcius(data.temperature_C, data.humidity);
            data.dewPoint_F = BME280.convertCelciusToFahrenheit(data.dewPoint_C);
            */
            data.altitude_m = BME280.calculateAltitudeMeters(data.pressure_hPa);
            data.altitude_ft = BME280.convertMetersToFeet(data.altitude_m);

            return callback(null, { BME280 : data });
          })
          .catch((err) => callback(null, { BME280 : { err : err }})),

        (callback) => {
          let data = this.dht22_1.readSensorData();
          data.temperature_F = BME280.convertCelciusToFahrenheit(data.temperature_C);
          return callback(null, { DHT22_1 : data });
        },

        (callback) => {
          let data = this.dht22_2.readSensorData();
          data.temperature_F = BME280.convertCelciusToFahrenheit(data.temperature_C);
          return callback(null, { DHT22_2 : data });
        },

        (callback) => {
          let data = this.ds18b20_1.readSensorData();
          return callback(null, { DS18B20_1 : data });
        },
        (callback) => {
          let data = this.ds18b20_2.readSensorData();
          return callback(null, { DS18B20_2 : data });
        },

        (callback) => this.tsl2561.readSensorData()
          .then((data) => callback(null, { TSL2561 : data }))
          .catch((err) => callback(null, { TSL2561 : { err : err }})),

        (callback) => callback(null, { timestamp : new Date() }),

        (callback) => callback(null, { GPS : this.gps.getData() }),

        (callback) => callback(null, { app : { platformUptime : os.uptime(),
                                               processUptime  : process.uptime(),
                                               engine         : `Node.js ${process.version}` }})
      ],

      (err, results) => resolve(deviceUtils.flattenResults(results)));
    });
  }

  locationDetails() {
    console.log('DevicesRPi.locationDetails()');

    const gpsData = this.gps.getData();
    
    return new Promise((resolve, reject) => {
      // Gather all of our data sources in parallel
      //
      async.parallel([

        (callback) => callback(null, { timestamp : gpsData.timestamp }),

        (callback) => callback(null, { solar : deviceUtils.suntimes(gpsData) }),

        (callback) => deviceUtils.reverseGeocode(gpsData)
          .then((data) => callback(null, { location : data }))
          .catch((err) => callback(null, { location : { err : err }})),

        (callback) => deviceUtils.lookupTimezone(gpsData)
          .then((data) => callback(null, { timezone : data }))
          .catch((err) => callback(null, { timezone : { err : err }}))
      ],

      (err, results) => resolve(deviceUtils.flattenResults(results)));
    });
  }

}

module.exports = DevicesRPi;
