/*
  data-display.js

  Draw gauges for live data, location on a Google map
*/

var map;
var marker;
var gotFirstFix = false;
var mapReady = false;

function initMap() {
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center : { lat : 49.845966, lng : 8.177154 },
    zoom : 4
  });

  // TODO: These listeners are a hack to get the map to initially display until I come
  // back to work on this. May have something to do with the fact that '#map-canvas' has
  // size (0,0) when initMap is called. Fix layout!
  //
  google.maps.event.addListenerOnce(map, 'idle', function() {
    google.maps.event.trigger(map, 'resize');
  });

  google.maps.event.addListenerOnce(map, 'projection_changed', function() {
    google.maps.event.trigger(map, 'resize');
  });

  google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
    mapReady = true;
    updateMap();
  });
}

function updateMap() {
  if(map && mapReady && (_.get($.sensorData, 'GPS.lat') || _.get($.sensorData, 'GPS.lon'))) {
    var latlng = new google.maps.LatLng($.sensorData.GPS.lat, $.sensorData.GPS.lon);

    // If this is our first good location, pan map to location. We'll do this only once
    // on first fix to allow the user to later pan/zoom as they desire.
    //
    if(!gotFirstFix) {
      gotFirstFix = true;
      map.setZoom(16);
      map.panTo(latlng);      
    }

    // Position marker at the current location
    //
    if(marker) {
      marker.setPosition(latlng);
    }
    else {
      marker = new google.maps.Marker({
        position : latlng,
        map : map,
        title : ''
      });
    }
  }
}

function initGauges() {
  google.charts.load('current', {'packages':['gauge']});
}

function drawGauges(sensorData) {
  if(!_.has(google, 'visualization.arrayToDataTable') || !_.has(google, 'visualization.Gauge'))
    return;

  var temperatureOutsideData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['°C (out) ', Number(_.get(sensorData, 'BME280.temperature_C', 0).toFixed(2))]
  ]);

  var humidityOutsideData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['% (out)', Number(_.get(sensorData, 'BME280.humidity', 0))]
  ]);

  var pressureOutsideData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['hPa (out)', Number(_.get(sensorData, 'BME280.pressure_hPa', 0).toFixed(2))]
  ]);

  var luxOutsideData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['lux (out)', Number(_.get(sensorData, 'TSL2561.lux', 0).toFixed(0))]
  ]);

  var temperatureWallOutsideData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['°C (w_out) ', Number(_.get(sensorData, 'DS18B20_1.temperature_C', 0).toFixed(2))]
  ]);

  var temperatureWallData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['°C (wall) ', Number(_.get(sensorData, 'DS18B20_2.temperature_C', 0).toFixed(2))]
  ]);

  var temperatureWallInsideData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['°C (w_in) ', Number(_.get(sensorData, 'DHT22_1.temperature_C', 0).toFixed(2))]
  ]);

  var humidityWallInsideData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['% (w_in)', Number(_.get(sensorData, 'DHT22_1.humidity', 0).toFixed(2))]
  ]);

  var temperatureInsideData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['°C (in) ', Number(_.get(sensorData, 'DHT22_2.temperature_C', 0).toFixed(2))]
  ]);

  var humidityInsideData = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['% (in)', Number(_.get(sensorData, 'DHT22_2.humidity', 0).toFixed(2))]
  ]);

  var temperatureOptions = {
    min        : -20,
    max        : 60,
    yellowFrom : 30,
    yellowTo   : 40,
    redFrom    : 40,
    redTo      : 60,
    minorTicks : 5,
    majorTicks : ['-20', '0', '20', '40', '60']
  };

  var humidityOptions = {
    min        : 0,
    max        : 100,
    minorTicks : 4,
    majorTicks : ['0', '20', '40', '60', '80', '100']
  };

  var pressureOptions = {
    min        : 900,
    max        : 1100,
    minorTicks : 4,
    majorTicks : ['Stormy', 'Rain', 'Change', 'Fair', 'Dry']
  };

  var luxOptions = {
    min        : 0,
    max        : 40000,
    minorTicks : 10,
    majorTicks : ['0','10000', '20000', '30000', '40000']
  };

  if(!$.temperatureOutsideGauge) {
    $.temperatureOutsideGauge = new google.visualization.Gauge(document.getElementById('temperature-outside-gauge'));
  }

  if(!$.humidityOutsideGauge) {
    $.humidityOutsideGauge = new google.visualization.Gauge(document.getElementById('humidity-outside-gauge'));
  }

  if(!$.pressureOutsideGauge) {
    $.pressureOutsideGauge = new google.visualization.Gauge(document.getElementById('pressure-outside-gauge'));
  }

  if(!$.luxOutsideGauge) {
    $.luxOutsideGauge = new google.visualization.Gauge(document.getElementById('lux-outside-gauge'));
  }

  if(!$.temperatureWallOutsideGauge) {
    $.temperatureWallOutsideGauge = new google.visualization.Gauge(document.getElementById('temperature-walloutside-gauge'));
  }

  if(!$.temperatureWallGauge) {
    $.temperatureWallGauge = new google.visualization.Gauge(document.getElementById('temperature-wall-gauge'));
  }

  if(!$.temperatureWallInsideGauge) {
    $.temperatureWallInsideGauge = new google.visualization.Gauge(document.getElementById('temperature-wallinside-gauge'));
  }

  if(!$.humidityWallInsideGauge) {
    $.humidityWallInsideGauge = new google.visualization.Gauge(document.getElementById('humidity-wallinside-gauge'));
  }

  if(!$.temperatureInsideGauge) {
    $.temperatureInsideGauge = new google.visualization.Gauge(document.getElementById('temperature-inside-gauge'));
  }

  if(!$.humidityInsideGauge) {
    $.humidityInsideGauge = new google.visualization.Gauge(document.getElementById('humidity-inside-gauge'));
  }

  $.temperatureOutsideGauge.draw(temperatureOutsideData, temperatureOptions);
  $.humidityOutsideGauge.draw(humidityOutsideData, humidityOptions);
  $.pressureOutsideGauge.draw(pressureOutsideData, pressureOptions);
  $.luxOutsideGauge.draw(luxOutsideData, luxOptions);
  $.temperatureWallOutsideGauge.draw(temperatureWallOutsideData, temperatureOptions);
  $.temperatureWallGauge.draw(temperatureWallData, temperatureOptions);
  $.temperatureWallInsideGauge.draw(temperatureWallInsideData, temperatureOptions);
  $.humidityWallInsideGauge.draw(humidityWallInsideData, humidityOptions);
  $.temperatureInsideGauge.draw(temperatureInsideData, temperatureOptions);
  $.humidityInsideGauge.draw(humidityInsideData, humidityOptions);
}

var currentChart = null;

function initCurrentCharts() {
  // this.currentChart = new Highcharts.Chart('currentChart', {
  //    chart: {
  //       zoomType: 'x',
  //       defaultSeriesType: 'spline'
  //     },
  //     title: {
  //       text: 'current data'
  //     },
  //     xAxis: {
  //       type: 'datetime',
  //       tickPixelInterval: 150,
  //       maxZoom: 20 * 100
  //     },
  //     yAxis: {
  //       title: {
  //         text: 'temperature °C'
  //       }
  //     },
  //     series: [{
  //       type: 'spline',
  //       name: 'temperature',
  //       data: currentTemperature
  //     }]
  // });
  this.currentChart = new Highcharts.Chart('currentChart', {
      chart: { 
        zoomType: 'xy'
      },
      title: {
        text: 'BME outside'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: [{
        labels: {
          format: '{value}°C',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        title: {
          text: 'Temperature',
          style: {
            color: Highcharts.getOptions().colors[2]
          }
        },
        opposite: true
      }, {
        gridLineWidth: 0,
        title: {
          text: 'Humidity',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        },
        labels: {
          format: '{value} %',
          style: {
            color: Highcharts.getOptions().colors[0]
          }
        }
      }, {
        gridLineWidth: 0,
        title: {
          text: 'Pressure',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        labels: {
          format: '{value} hPa',
          style: {
            color: Highcharts.getOptions().colors[1]
          }
        },
        opposite: true
      }],
      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 80,
        verticalAlign: 'top',
        y: 55,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
      },
      series: [{
        id: 'series-humidity-outside',
        name: 'Humidity',
        type: 'column',
        yAxis: 1,
        data: [],
        tooltip: {
          valueSuffix: ' %'
        }
      }, {
        id: 'series-pressure-outside',
        name: 'Pressure',
        type: 'spline',
        yAxis: 2,
        data: [],
        marker: {
          enabled: false
        },
        dashStyle: 'shortDot',
         tooltip: {
          valueSuffix: ' hPa'
        }
      }, {
        id: 'series-temperature-outside',
        name: 'Temperature',
        type: 'spline',
        yAxis: 0,
        data: [],
         tooltip: {
          valueSuffix: ' °C'
        }
      }]
    });
}

function drawCurrentCharts(sensorData) {
  // temperature
  var temperatureSeries = this.currentChart.get('series-temperature-outside');
  var shift = temperatureSeries.data.length > 20;
  temperatureSeries.addPoint([new Date(_.get(sensorData, 'timestamp', 0)).getTime(), _.get(sensorData, 'BME280.temperature_C', -1)], true, shift); 
  // humidity
  var humiditySeries = this.currentChart.get('series-humidity-outside');
  var shift = humiditySeries.data.length > 20;
  humiditySeries.addPoint([new Date(_.get(sensorData, 'timestamp', 0)).getTime(), _.get(sensorData, 'BME280.humidity', -1)], true, shift); 
  // pressure
  var pressureSeries = this.currentChart.get('series-pressure-outside');
  var shift = pressureSeries.data.length > 20;
  pressureSeries.addPoint([new Date(_.get(sensorData, 'timestamp', 0)).getTime(), _.get(sensorData, 'BME280.pressure_hPa', -1)], true, shift); 
}
