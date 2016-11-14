'use strict';

angular.module('myApp.charts', ['ngRoute','nvd3'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/charts', {
    templateUrl: 'components/charts/charts.html',
    controller: 'chartController'
  });
}])

.controller('chartController', function($scope) {
  $scope.options = {
            chart: {
                type: 'lineChart',
                height: 350,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 40,
                    left: 55
                },
                x: function(d){ return d.x; },
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
                dispatch: {
                    stateChange: function(e){ console.log("stateChange"); },
                    changeState: function(e){ console.log("changeState"); },
                    tooltipShow: function(e){ console.log("tooltipShow"); },
                    tooltipHide: function(e){ console.log("tooltipHide"); }
                },
                xAxis: {
                    axisLabel: 'Time (ms)'
                },
                yAxis: {
                    axisLabel: 'Voltage (v)',
                    tickFormat: function(d){
                        return d3.format('.02f')(d);
                    },
                    axisLabelDistance: -10
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            },
            title: {
                enable: true,
                text: 'Line Chart'
            },
            subtitle: {
                enable: false,
                text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                css: {
                    'text-align': 'center',
                    'margin': '10px 13px 0px 7px'
                }
            },
            caption: {
                enable: true,
                html: '<center><b>Figure 1.1 </b>: line chart example</center>',
                css: {
                    'text-align': 'justify',
                    'margin': '10px 13px 0px 7px'
                }
            }
        };

        $scope.data = sinAndCos();

        /*Random Data Generator */
        function sinAndCos() {
            var sin = [],sin2 = [],
                cos = [],cos2 = [];

            //Data is represented as an array of {x,y} pairs.
            for (var i = 0; i < 100; i++) {
                sin.push({x: i, y: Math.sin(i/10)});
                sin2.push({x: i, y: i % 5 == 2.5 ? null : Math.sin(i/10) *0.25 + 0.5});
                cos.push({x: i, y: .5 * Math.cos(i/10+ 2) + Math.random() / 10});
                cos2.push({x: i, y: .5 * Math.cos(i/5+ 2) + Math.random() / 5});
            }

            //Line chart data should be sent as an array of series objects.
            return [
                {
                    values: sin,      //values - represents the array of {x,y} data points
                    key: 'Sine Wave', //key  - the name of the series.
                    color: '#ff7f0e',  //color - optional: choose your own line color.
                    strokeWidth: 2,
                    classed: 'dashed'
                },
                {
                    values: cos,
                    key: 'Cosine Wave',
                    color: '#2ca02c'
                },
                {
                    values: sin2,
                    key: 'Another sine wave',
                    color: '#7777ff',
                    area: true      //area - set to true if you want this line to turn into a filled area chart.
                },
                {
                    values: cos2,
                    key: 'Another cosine Wave',
                    color: '#4cb09c',
                    strokeWidth: 2
                }

            ];
        };

        $scope.empLineChart = {
                  chart: {
                      type: 'lineChart',
                      height: 350,
                      margin : {
                          top: 20,
                          right: 20,
                          bottom: 40,
                          left: 55
                      },
                      x: function(d){ return d.x; },
                      y: function(d){ return d.y; },
                      useInteractiveGuideline: true,
                      tooltip: {
                        contentGenerator: function (key, x, y, e, graph) {
                          return '<h1>Test</h1>';
                        }
                      },
                      dispatch: {
                          stateChange: function(e){ console.log("stateChange"); },
                          changeState: function(e){ console.log("changeState"); },
                          tooltipShow: function(e){ console.log("tooltipShow"); },
                          tooltipHide: function(e){ console.log("tooltipHide"); }
                      },
                      xAxis: {
                          axisLabel: 'Working days'
                      },
                      yAxis: {
                          axisLabel: 'Working hours(time)',
                          tickFormat: function(d){
                              return d3.format('0.000')(d);
                          },
                          axisLabelDistance: -10
                      },
                      callback: function(chart){
                          console.log("!!! employee lineChart callback !!!");
                      }
                  },
                  title: {
                      enable: true,
                      text: 'Line Chart'
                  },
                  subtitle: {
                      enable: false,
                      text: 'Subtitle for simple line chart. Lorem ipsum dolor sit amet, at eam blandit sadipscing, vim adhuc sanctus disputando ex, cu usu affert alienum urbanitas.',
                      css: {
                          'text-align': 'center',
                          'margin': '10px 13px 0px 7px'
                      }
                  },
                  caption: {
                      enable: true,
                      html: '<center><b>Figure 1.2 </b>: Employees daily work line chart</center>',
                      css: {
                          'text-align': 'justify',
                          'margin': '10px 13px 0px 7px'
                      }
                  }
              };

              $scope.empData = employeeData();

              /*Random Data Generator */
              function employeeData() {
                  var emp1 = [],emp2 = [];
                  //Data is represented as an array of {x,y} pairs.
                  var maximum = 1;
                  var minimum = 12;
                  for(var i = 1; i<=31 ; i++){
                    emp1.push({x:i,y:Math.floor(Math.random() * (maximum - minimum + 1)) + minimum});
                    emp2.push({x:i,y:Math.floor(Math.random() * (maximum - minimum + 1)) + minimum});
                  }

                  //Line chart data should be sent as an array of series objects.
                  return [
                      {
                          values: emp1,      //values - represents the array of {x,y} data points
                          key: 'Shubham Pardeshi', //key  - the name of the series.
                          color: '#ff7f0e',  //color - optional: choose your own line color.
                          strokeWidth: 2,
                          classed: 'dashed'
                      },
                      {
                          values: emp2,
                          key: 'Nilesh Patil',
                          color: '#2ca02c'
                      }
                  ];
              };

              $scope.multiBarchartOptions = {
                    chart: {
                       type: 'multiBarChart',
                       height: 450,
                       margin : {
                           top: 20,
                           right: 20,
                           bottom: 45,
                           left: 45
                       },
                       clipEdge: true,
                       duration: 500,
                       stacked: true,
                       xAxis: {
                           axisLabel: 'Time (ms)',
                           showMaxMin: false,
                           tickFormat: function(d){
                               return d3.format(',f')(d);
                           }
                       },
                       yAxis: {
                           axisLabel: 'Y Axis',
                           axisLabelDistance: 20,
                           tickFormat: function(d){
                               return d3.format(',.1f')(d);
                           }
                       },
                       caption: {
                           enable: true,
                           html: '<center><b>Figure 1.3 </b>: Multi Bar chart</center>',
                           css: {
                               'text-align': 'justify',
                               'margin': '10px 13px 0px 7px'
                           }
                       }
                   }
              };

              $scope.multiBarchartData = generateMultiBarchartData();
              function generateMultiBarchartData(){
                    return stream_layers(2,5+Math.random()*5,.5).map(function(data, i) {
                    return {
                        key: 'Stream' + i,
                        values: data
                    };
                });
              }

              /* Inspired by Lee Byron's test data generator. */
              function stream_layers(n, m, o) {
                  if (arguments.length < 3) o = 0;
                  function bump(a) {
                      var x = 1 / (.1 + Math.random()),
                          y = 2 * Math.random() - .5,
                          z = 10 / (.1 + Math.random());
                      for (var i = 0; i < m; i++) {
                          var w = (i / m - y) * z;
                          a[i] += x * Math.exp(-w * w);
                      }
                  }
                  return d3.range(n).map(function() {
                      var a = [], i;
                      for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                      for (i = 0; i < 5; i++) bump(a);
                      return a.map(stream_index);
                  });
              }

              /* Another layer generator using gamma distributions. */
              function stream_waves(n, m) {
                  return d3.range(n).map(function(i) {
                      return d3.range(m).map(function(j) {
                          var x = 50 * j / m - i ;
                          return 2 * x * Math.exp(-.5 * x);
                      }).map(stream_index);
                  });
              }

              function stream_index(d, i) {
                  return {x: i, y: Math.max(0, d)};
              }

});
