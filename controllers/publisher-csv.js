/*
  publisher-csv.js

  CsvPublisher persists sensor data for historical views.
*/

'use strict';

const FILENAME_PREFIX = 'KuhPi_datapackage_';
const CSV_SEPARATOR   = ',';

const _          = require('lodash');
const fs         = require('fs');
const moment     = require('moment');
const fileExists = require('file-exists')

class CsvPublisher {

  // instance() - create a singleton instance of Publisher
  //
  static instance() {
    const PublisherSingletonSymbol = Symbol.for('app.pi-weather-station.csv-publisher');
    return Object.getOwnPropertySymbols(global).indexOf(PublisherSingletonSymbol) >= 0 ?
      global[PublisherSingletonSymbol] : (global[PublisherSingletonSymbol] = new CsvPublisher());
  }

  // constructor() - Would ideally have a private constructor. Users should not instantiate
  // this class directly, but should instead call Publisher.instance() for the singleton.
  //
  constructor() {
    console.log('Creating CsvPublisher');

    this.deviceManager = require('../devices/device-manager.js').instance();
    this.publishRateMs = Number(process.env.DATABASE_SENSOR_DATA_RATE_MS);
    this.deviceId      = process.env.PI_WEATHER_STATION_DEVICE_ID;
  }

  // startPublishing() - fire up the publisher and persist sensor data snapshots to the DB
  // at the configured interval.
  //
  startPublishing() {

    if(!this.deviceId) {
      console.error('Unknown device id, CsvPublisher will not start!');
      return;
    }

    if(!this.publishRateMs || isNaN(this.publishRateMs) || this.publishRateMs <= 0) {
      console.error(`CsvPublisher update rate is not valid [${this.publishRateMs}], will not start!`);
      return;
    }

    console.log(`CsvPublisher starting with update rate ${this.publishRateMs}ms`);

    this.publishEnabled = true;
    this._restartPublishTimer();
  }

  // stopPublisher()
  //
  stopPublishing() {
    console.log('CsvPublisher: stop publishing');
    clearTimeout(this.timeoutId);
    this.publishEnabled = false;
  }

  // _restartPublishTimer() - internal method to restart our publishing timer
  //
  _restartPublishTimer() {
    if(this.publishEnabled) {
      this.timeoutId = setTimeout(() => this._publish(), this.publishRateMs);
    }
  }

  

  // _publish() - internal method to read sensor data, persist to file
  // 
  _publish() {

    this._writeFileHeader()
      .then(() => this.deviceManager.readSensors())
      .then((data) => {
        var filename = this._getFilename();
        var dataRaw = [
          _.get(data, 'timestamp', undefined).toISOString(),
          _.get(data, 'BME280.temperature_C', 0),
          _.get(data, 'BME280.humidity', 0),
          _.get(data, 'BME280.pressure_hPa', 0),
          _.get(data, 'TSL2561.lux', 0),
          _.get(data, 'DS18b20_1.temperature_C', 0),
          _.get(data, 'DS18b20_2.temperature_C', 0),
          _.get(data, 'DHT22_1.temperature_C', 0),
          _.get(data, 'DHT22_1.humidity', 0),
          _.get(data, 'DHT22_2.temperature_C', 0),
          _.get(data, 'DHT22_2.humidity', 0),
          '\n'
        ];
        var data = dataRaw.join(CSV_SEPARATOR);

        fs.appendFile(filename, data, function(err) {
          if (err) {
            console.error(`Failed to save SensorData to csv file! Error: ${err}`)
          }
          else {
            console.log(`Saved "${JSON.stringify(dataRaw, null, 2)}" to file "${filename}"`)
          }
        });

        this._restartPublishTimer();
      })
      .catch((err) => {
        console.error(`Unable to publish sensor data, DeviceManager.readSensors() error: ${err}`);
        this._restartPublishTimer();
      });
  }

  _writeFileHeader() {
    var self = this;
    return new Promise(function(resolve, reject) {
      var filename = self._getFilename();
      if (fileExists.sync(filename)) {
          resolve('File already exists');
          return;
      }
      var currentDate = new Date();
      var dateString = moment(currentDate).format('YY/MM/DD');
      var timeString = moment(currentDate).format('HH/mm/ss');
      var unitTemp = 'C';
      var unitHumidity = '%';
      var unitPressure = 'hPa';
      var unitLight = 'lux';
      let map = new Map([
        ['timestamp', 'datetime'],
        ['temperature_air_outside', unitTemp],
        ['humidity_air_outside', unitHumidity],
        ['pressure_air_outside', unitPressure],
        ['lux_outside', unitLight],
        ['temperature_wall_outside', unitTemp],
        ['temperature_wall', unitTemp],
        ['temperature_wall_inside', unitTemp],
        ['humidity_wall_inside', unitHumidity],
        ['temperature_air_inside', unitTemp],
        ['humidity_air_inside', unitHumidity],
      ]);
      var headers = '';
      for (let key of map.keys()) {
        headers = headers + '\"' + key + '\"' + CSV_SEPARATOR;
      }
      headers = headers.replace(/,$/, '');
      var units = '';
      for (let value of map.values()) {
        units = units + '\"' + value + '\"' + CSV_SEPARATOR;
      }
      units = units.replace(/,$/, '');

      var csvRaw = [
        `"Data Source"${CSV_SEPARATOR}"KuhPi Data Logger"`,
        `"Comment"${CSV_SEPARATOR}""`,
        `"Timestamp"${CSV_SEPARATOR}"${currentDate.toISOString()}"`,
        `"Date"${CSV_SEPARATOR}"${dateString}"`,
        `"Time"${CSV_SEPARATOR}"${timeString}"`,
        "",
        `${headers}`,
        `${units}`,
        "\n"
      ];
      var csv = csvRaw.join('\n');
      fs.writeFile(filename, csv, function(err) {
        if (err) {
          console.error(`Failed to write data to csv file ${filename}: ${err}`)
        }
      })
      resolve('Successfully written');
    });
  }

  _getFilename() {
    var currentDate = new Date();
    var formattedDate = moment(currentDate).format('YYYY-MM-DD');
    var filename = `./data/${FILENAME_PREFIX}${formattedDate}.csv`;
    return filename;
  }
  
}

module.exports = CsvPublisher;
