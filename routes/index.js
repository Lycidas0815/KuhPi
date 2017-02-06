/*
  index.js

  Express routes for our application
*/

'use strict';

const router     = require('express').Router();
const SensorData = require('../model/sensor-data.js');
const moment     = require('moment');

// DeviceManager provides a platform-independent interface to our hardware devices
// so we can install and run this application on different platforms.
//
const DeviceManager = require('../devices/device-manager.js');
const deviceManager = DeviceManager.instance();

// GET live sensor data
//
router.get('/sensors/live', (req, res) =>
  deviceManager.readSensors()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err)));

// GET sensor history data
//
router.get('/sensors/history/:startDate?/:endDate?', (req, res) => {

  let query = { deviceId : process.env.PI_WEATHER_STATION_DEVICE_ID };

  var start_date = req.params.startDate;
  if (!start_date) {
    start_date = '1970-01-01T00:00';
  } else {
    if(!moment(start_date, moment.ISO_8601).isValid()) {
          return res.status(400).send('Invalid ISO 8601 startDate');
    }
  }
  var end_date = req.params.endDate;
  if (!end_date) {
    end_date = new Date();
    console.log(end_date);
    console.log(end_date.toISOString());
  } else {
    if(!moment(end_date, moment.ISO_8601).isValid()) {
      return res.status(400).send('Invalid ISO 8601 startDate');
    }
  }

  query.timestamp = {'$gte' : start_date, '$lte' : end_date };

  SensorData.find(query)
            .select('-_id -__v -deviceId') // Keep it clean for the caller. Could also {select : false} in the SensorData schema definition.
            .exec((err, docs) => err ? res.status(500).send(err) : res.status(200).send(docs));
});

// GET GPS location, timezone, other associated data
//
router.get('/location', (req, res) =>
  deviceManager.locationDetails()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send(err)));

module.exports = router;
