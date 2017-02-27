/*
  ds18b20.js

  An interface to the ds18b20 ambient temperature sensor.
*/

'use strict';

class ds18b20 {
  constructor(sensorId) {
    this.sensorId        = sensorId;
    this.ds18b20         = require('ds18b20');
  }

  readSensorData() {
    return new Promise((resolve, reject) => {
      this.ds18b20.temperature(this.sensorId, function(err, result){
        if (err) {
          return reject(err.cause);
        }
        resolve({ temperature_C: result});
      });
    });
  }
}

module.exports = ds18b20;
