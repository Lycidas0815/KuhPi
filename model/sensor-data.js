/*
  sensor-data.js

  SensorData schema for persisted historical data.
*/

'use strict';

const mongoose = require('mongoose');

const sensorDataSchema = mongoose.Schema({
  deviceId     : { type : String, required : true },
  name         : { type : String },
  timestamp    : { type : Date, default : undefined, required : true },
  created_at   : { type : Date, default : undefined, required : true },
  modified_at  : { type : Date, default : undefined, required : true },
  properties   : {
    // BME280
    temperature_air_outside  : { type : Number, default : undefined, required : true },
    humidity_air_outside     : { type : Number, default : undefined, required : true },
    pressure_air_outside     : { type : Number, default : undefined, required : true },
    // TSL2561
    lux_outside              : { type : Number, default : undefined, required : true },
    // DS18B20s
    temperature_wall_outside : { type : Number, default : undefined, required : true },
    temperature_wall         : { type : Number, default : undefined, required : true },
    // DHT22s
    temperature_wall_inside  : { type : Number, default : undefined, required : true },
    humidity_wall_inside     : { type : Number, default : undefined, required : true },
    temperature_air_inside   : { type : Number, default : undefined, required : true },
    humidity_air_inside      : { type : Number, default : undefined, required : true },
  }
},
{
  collection : 'sensorData'
});

// TTL defaults to 30 days unless you tell me differently
//
let ttl = parseInt(process.env.DATABASE_SENSOR_DATA_TTL_SECONDS);

if(!ttl) {
  ttl = 24 * 60 * 60 * 30; // 30 days in seconds
}

sensorDataSchema.index({ timestamp: 1 }, { expireAfterSeconds: ttl });

module.exports = mongoose.model('SensorData', sensorDataSchema);
