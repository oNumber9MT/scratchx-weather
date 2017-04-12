(function(ext) {
  ext._shutdown = function() {};

  ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
  };

  ext.get_weather = function(callback) {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=Tokyo,%20JP&units=imperial&APPID=29db1a017c2219ae1a09a9d63ecee5cb',
      dataType: 'jsonp',
      success: function(data) {
        if (data.cod == 200) {
          console.log(data);
          var main = data.weather[0].main;
          if (main == undefined) {
            callback('');
          } else {
            callback(main);
          }
        } else {
          callback('');
        }
      }
    });
  };

  ext.get_location_weather = function(loc, callback) {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(loc) + '&units=imperial&APPID=29db1a017c2219ae1a09a9d63ecee5cb',
      dataType: 'jsonp',
      success: function(data) {
        if (data.cod == 200) {
          console.log(data);
          var main = data.weather[0].main;
          if (main == undefined) {
            callback('');
          } else {
            callback(main);
          }
        } else {
          callback('');
        }
      }
    });
  };

  ext.get_location_temp = function(loc, callback) {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(loc) + '&units=imperial&APPID=29db1a017c2219ae1a09a9d63ecee5cb',
      dataType: 'jsonp',
      success: function(data) {
        if (data.cod == 200) {
          console.log(data);
          var temp = data.main.temp;
          if (temp == undefined) {
            callback('');
          } else {
            callback((5/9)*(temp-32));
          }
        } else {
          callback('');
        }
      }
    });
  };

  ext.get_location_pressure = function(loc, callback) {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(loc) + '&units=imperial&APPID=29db1a017c2219ae1a09a9d63ecee5cb',
      dataType: 'jsonp',
      success: function(data) {
        if (data.cod == 200) {
          console.log(data);
          var pressure = data.main.pressure;
          if (pressure == undefined) {
            callback('');
          } else {
            callback(pressure);
          }
        } else {
          callback('');
        }
      }
    });
  };

  ext.get_location_humidity = function(loc, callback) {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(loc) + '&units=imperial&APPID=29db1a017c2219ae1a09a9d63ecee5cb',
      dataType: 'jsonp',
      success: function(data) {
        if (data.cod == 200) {
          console.log(data);
          var humidity = data.main.humidity;
          if (humidity == undefined) {
            callback('');
          } else {
            callback(humidity);
          }
        } else {
          callback('');
        }
      }
    });
  };

  var forecast = [];
  var pointer = 0;
  ext.retrive_forecast = function(loc, callback) {
    forecast = [];
    pointer = 0;
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + encodeURIComponent(loc) + '&units=imperial&APPID=29db1a017c2219ae1a09a9d63ecee5cb',
      dataType: 'jsonp',
      success: function(data) {
        if (data.cod == 200) {
          forecast = data.list;
          callback();
        } else {
          callback();
        }
      }
    });
  };

  ext.get_forecast_temp = function() {
     if (forecast.length <= 0) {
       return '';
     }

     if (pointer >= forecast.length) {
       return '';
     }
 
     var f = forecast[pointer];
     pointer++;
     return (5/9)*(f.main.temp-32);
  }

  var descriptor = {
    blocks: [
      ['R', '天気を取得', 'get_weather'],
      ['R', '%s の天気を取得', 'get_location_weather'],
      ['R', '%s の気温を取得', 'get_location_temp'],
      ['R', '%s の気圧を取得', 'get_location_pressure'],
      ['R', '%s の予報を取得', 'retrive_forecast'],
      ['r', '予報から気温を1つ取得', 'get_forecast_temp']
    ]
  };

  ScratchExtensions.register('お天気拡張', descriptor, ext);
})({});