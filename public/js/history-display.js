/*
  history-display.js

  Draw some charts to display sensor data over time.
*/

function initHistory() {

  const endDate = new Date();
  const startDate = new Date(endDate - 1000 * 3600 * 24); // last 24 hours

  // $.get(window.dataSourceUrl + '/sensors/history/' + startDate.toISOString() + '/' + endDate.toISOString(), function(data) {
  $.get(window.dataSourceUrl + '/sensors/history/', function(data) {

    var temperature = [];
    var humidity = [];
    var pressure = [];
    var lux = [];

    var temperatureOutside = [];
    var humidityOutside = [];
    var pressureOutside = [];

    var dataSize = 0;

    data.forEach((element, idx) => {
      //if(idx % 5) return; // arbitrary thinning for some nice curve smoothing and faster rendering
      temperature.push({ x : element.timestamp, y : element.properties.temperature_air_outside * 9 / 5 + 32 });
      humidity.push({ x : element.timestamp, y : element.properties.humidity_air_outside });
      pressure.push({ x : element.timestamp, y : element.properties.pressure_air_outside });

      if(element.properties.lux_outside >= 0 && element.properties.lux_outside <= 40000) { // TSL2561 gets blown out in direct sunlight to clean it up
        lux.push({ x : element.timestamp, y : element.properties.lux_outside });
      }

      temperatureOutside.push([new Date(element.timestamp).getTime(), element.properties.temperature_air_outside]);
      humidityOutside.push([new Date(element.timestamp).getTime(), element.properties.humidity_air_outside]);
      pressureOutside.push([new Date(element.timestamp).getTime(), element.properties.pressure_air_outside]);

      dataSize++;
    });

    console.log(dataSize);

    var highChartPlotOptions = {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    };

    var chartOptions = {
      elements : {
        point : {
          radius : 0
        }
      },
      scales : {
        xAxes : [{
          type : 'time',
          unit : 'day',
          unitStepSize : 1,
          position : 'bottom',
          ticks : {
            maxRotation : 25,
            minRotation : 25,
          },
          time : {
            displayFormats : {
              day : 'MMM DD'
          }}
        }]
      },
      tooltips : {
        callbacks : {
          title : function(tooltipItems, data) {
            // UTC to local date/time
            var d = new Date(tooltipItems[0].xLabel);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
          },
          label : function(tooltipItem, data) {
            // Two digits of precision will do
            return data.datasets[0].label + ': ' + Number(data.datasets[0].data[tooltipItem.index].y).toFixed(2);
          },
        }
      },
      legend : {
        onClick : function(evnt, legendItem) {
          // disabling click-to-toggle legend visibility
        }
      }
    };

    var temperatureChartData = {
      type : 'line',
      data : {
        datasets : [{
          label : 'Temperature (F)',
          backgroundColor : 'rgba(255, 136, 0, 0.60)',
          borderColor : 'rgba(0, 0, 0, 0)',
          data : temperature
        }]
      },
      options : chartOptions
    };

    var humidityChartData = {
      type : 'line',
      data : {
        datasets : [{
          label : 'Humidity',
          backgroundColor : 'rgba(77, 158, 239, 0.60)',
          borderColor : 'rgba(0, 0, 0, 0)',
          data : humidity
        }]
      },
      options : chartOptions
    };

    var pressureChartData = {
      type : 'line',
      data : {
        datasets : [{
          label : 'Pressure (inHg)',
          backgroundColor : 'rgba(0, 199, 116, 0.50)',
          borderColor : 'rgba(0, 0, 0, 0)',
          data : pressure
        }]
      },
      options : chartOptions
    };

    var luxChartData = {
      type : 'line',
      data : {
        datasets : [{
          label : 'Lux',
          backgroundColor : 'rgba(242, 230, 69, 0.60)',
          borderColor : 'rgba(0, 0, 0, 0)',
          data : lux
        }]
      },
      options : chartOptions
    };

    // var temperatureChart = new Chart($('#temperatureChart'), temperatureChartData);    
    // var humidityChart = new Chart($('#humidityChart'), humidityChartData);
    // var pressureChart = new Chart($('#pressureChart'), pressureChartData);
    // var luxChart = new Chart($('#luxChart'), luxChartData);

    var temperatureOutsideChart = new Highcharts.Chart('temperatureOutsideChart', {
      chart: {
        zoomType: 'x'
      },
      title: {
        text: 'temperature outside'
      },
      subtitle: {
        text: document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'temperature °C'
        }
      },
      legend: {
        enabled: true
      },
      plotOptions: highChartPlotOptions,
      series: [{
        type: 'area',
        name: 'temperature',
        data: temperatureOutside
      }]
    });

    var outsideChart = new Highcharts.Chart('outsideChart', {
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
        name: 'Humidity',
        type: 'column',
        yAxis: 1,
        data: humidityOutside,
        tooltip: {
          valueSuffix: ' %'
        }
      }, {
        name: 'Pressure',
        type: 'spline',
        yAxis: 2,
        data: pressureOutside,
        marker: {
          enabled: false
        },
        dashStyle: 'shortDot',
         tooltip: {
          valueSuffix: ' hPa'
        }
      }, {
        name: 'Temperature',
        type: 'spline',
        data: temperatureOutside,
         tooltip: {
          valueSuffix: ' °C'
        }
      }]
    });

  }).
  fail(function(xhr, status, error) {
    console.log('Failed to retrieve sensor history! Error ' + xhr.status + ': ' + xhr.responseText);
  });
}
