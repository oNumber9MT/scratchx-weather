(function(ext) {
  ext._shutdown = function() {};

  ext._getStatus = function() {
    return {status: 2, msg: 'Ready'};
  };

  ext.get_weather = function(callback) {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=Kashiwa,%20JP&units=imperial&APPID=fa4bc3cd05fcedff03fcec2db6bb2a4f',
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

  ext.get_location_wather = function(loc, callback) {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(loc) + '&units=imperial&APPID=fa4bc3cd05fcedff03fcec2db6bb2a4f',
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
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(loc) + '&units=imperial&APPID=fa4bc3cd05fcedff03fcec2db6bb2a4f',
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

  ext.get_location_temp = function(loc, callback) {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(loc) + '&units=imperial&APPID=fa4bc3cd05fcedff03fcec2db6bb2a4f',
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

  var forecast = [];
  var pointer = 0;
  ext.retrive_forcast = function(loc, callback) {
    forecast = [];
    pointer = 0;
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + encodeURIComponent(loc) + '&units=imperial&APPID=fa4bc3cd05fcedff03fcec2db6bb2a4f',
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

  ext.get_forcast_temp = function() {
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
      ['R', '%s の天気を取得', 'get_location_wather'],
      ['R', '%s の気温を取得', 'get_location_temp'],
      ['w', '%s の予報を取得', 'retrive_forcast'],
      ['r', '予報から気温を1つ取得', 'get_forcast_temp']
    ]
  };

  ScratchExtensions.register('お天気拡張', descriptor, ext);
})({});