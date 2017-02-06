/*
  ds18b20.js

  An interface to the ds18b20 ambient temperature sensor.
*/

'use strict';

class ds18b20 {
  constructor(sensorId) {
    this.sensorId        = sensorId;
    this.ds18b20         = require('ds18b20');
    this.temperature_C = 0;

    this.pollingWorker(2000);
  }

  readSensorData() {
    return { temperature_C : this.temperature_C };
  }

  pollingWorker(ms) {
    this.ds18b20.temperature(this.sensorId, function(err, result){
      if (err) {
        // TODO: retry?
      } else {
        this.temperature_C = result;
      }
    });
  
    setTimeout(() => this.pollingWorker(ms), ms); 
  }
}

module.exports = ds18b20;
