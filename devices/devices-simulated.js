/*
  devices-simulated.js

  A simulated interface to our devices so we can run this application on any platform.
*/

'use strict';

const DevicesBase = require('./devices-base.js');
const os          = require('os');

class DevicesSimulated extends DevicesBase {

  constructor() {
    super();
    console.log('Creating DevicesSimulated');
  }

  ledOn() {
    console.log('DevicesSimulated.ledOn()');
    return new Promise((resolve, reject) => resolve('OK'));
  }

  ledOff() {
    console.log('DevicesSimulated.ledOff()');
    return new Promise((resolve, reject) => resolve('OK'));
  }

  readSensors() {
    console.log('DevicesSimulated.readSensors()');

    // Including a little bit of movement in the fake data to illustrate live updates on the front end
    //
    return new Promise((resolve, reject) => {
      let seconds = new Date().getSeconds();
      let c1 = 15 + seconds / 60 * 15;
      let c2 = 20 + seconds / 60 * 20;
      let c3 = 25 + seconds / 60 * 25;
      let c4 = 1 + seconds / 60 * 10;
      let direction = this.randomDoubleFromInterval(0,1) > 0.5 ? true : false;
      //console.log(`Simulated: seconds = ${seconds},\n   c1 = ${c1},\n   c2 = ${c2},\n   c3 = ${c3}`);
      let fakeData = {
        simulated : true,
        timestamp : new Date().toISOString(),
        BME280 : {
          temperature_C : c2,
          temperature_F : c2 * 9 / 5 + 32,
          humidity : this.randomDoubleFromInterval(30, 70),
          pressure_hPa : direction ? 1003.25 + c4 : 1003.25 - c4,
          pressure_inHg : 29.9539,
          altitude_m :  9.2139,
          altitude_ft : 30.2295
        },
        TSL2561 : {
          lux : 3000 + 250 * Math.random(),
          timestamp : new Date()
        },
        DS18B20_1 : {
          temperature_C : 42.3477,
        },
        DS18B20_2 : {
          temperature_C : 22.3477,
        },
        DHT22_1 : {
          temperature_C : c1,
          temperature_F : c1 * 9 / 5 + 32,
          humidity : 39.7666
        },
        DHT22_2 : {
          temperature_C : c1,
          temperature_F : c1 * 9 / 5 + 32,
          humidity : 39.7666
        },
        GPS : {
          lat : 49.845966 + Math.random() * 0.000001,
          lon : 8.177154 + Math.random() * 0.000001,
          altitude : 9.144 + Math.random() * 0.03,
          altitudeUnits : 'M',
          satelliteCount : 8,
          PDOP : 1.94,
          HDOP : 0.98,
          VDOP : 1.68,
          fix : '3D Fix',
          timestamp : new Date(),
          speedKnots : 0.01,
          heading : 227.16
        },
        app : {
          platformUptime : os.uptime(),
          processUptime  : process.uptime(),
          engine         : `Node.js ${process.version}`

        }
      };

      resolve(fakeData);
    });
  }

  locationDetails() {
    console.log('DevicesSimulated.locationDetails()');

    return new Promise((resolve, reject) => {
      let fakeData =  {
        timestamp : new Date(),
        solar : {
          sunrise : '2016-10-20T14:21:21.000Z',
          sunset : '2016-10-21T01:23:25.000Z'
        },
        location : {
          lat : '37.4448081',
          lon : '-122.165109168756',
          address : {
            house_number : '129',
            road : 'Lytton Avenue',
            neighbourhood : 'Downtown North',
            city : 'Palo Alto',
            county : 'Santa Clara County',
            state : 'California',
            postcode : '94301',
            country : 'United States of America',
            country_code : 'us'
          },
          boundingbox : [
            '37.4447023',
            '37.4449146',
            '-122.1652638',
            '-122.1649522'
          ]
        },
        timezone : {
          dstOffset : 3600,
          rawOffset : -28800,
          status : 'OK',
          timeZoneId : 'America/Los_Angeles',
          timeZoneName : 'Pacific Daylight Time'
        }
      };

      resolve(fakeData);
    });
  }

  randomDoubleFromInterval(min, max) {
    return Math.random()*(max-min+1)+min;
  }
}

module.exports = DevicesSimulated;
