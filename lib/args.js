/**
 * Created by apizzimenti on 12/29/15.
 */

var http = require('http'),
    https = require('https'),
    clc = require('cli-color'),
    Format = require('./format.js');

function weatherRequest(location, units) {
    var weather_options = {
        host: 'api.forecast.io',
        path: '/forecast/d399f7331297381cd6b95106add0d22d/' + location.lat + ',' + location.long + '?units=' + units.type,
        method: 'GET'
    };

    https.get(weather_options, function(res) {
        var json  = '';
        res
            .on('data', function (chunk) {
                json += chunk;
            })
            .on('end', function() {
                console.log(clc.green('✓ got data from weather server'));

                var weather = Format(json, units);
                console.log(weather.currentWeather);
                console.log(weather.tabled());
                process.exit();
            });
    });
}

function address(addr, callback, units) {

    var location_options = {
        host: 'maps.googleapis.com',
        path: '/maps/api/geocode/json?address=' + encodeURIComponent(addr.toString()),
        method: 'GET'
    };

    http.get(location_options, function (res) {
        var text = '',
            position = {};
        res
            .on('data', function (chunk) {
                text +=  chunk.toString();
            })
            .on('end', function () {
                var json = JSON.parse(text);
                if (json.status == "OK" && json.results[0]) {
                    console.log(clc.green('✓ got geo location server response'));
                    console.log(clc.green('✓ got location: ') + clc.bgBlack.white(json.results[0].formatted_address));
                    position.lat = json.results[0].geometry.location.lat;
                    position.long = json.results[0].geometry.location.lng;
                    callback(position, units);
                } else {
                    console.log(clc.red('✗ address not found'));
                }
            });
    });
}

function automatic(ip, callback, units) {

    var location_options = {
        host: 'freegeoip.net',
        path: '/json/' + ip,
        method: 'GET'
    };

    http.get(location_options, function (res) {
        var text = '',
            position = {};
        res
            .on('data', function (chunk) {
                console.log(clc.green('✓ got location server response'));
                text +=  chunk.toString();
            })
            .on('end', function () {
                var json = JSON.parse(text),
                    location = json.city + ', ' + json.region_name + ', ' + json.country_name;
                position.lat = json.latitude;
                position.long = json.longitude;
                console.log(clc.green('✓ got location: ') + clc.bgBlack.white(location));
                callback(position, units);
            });
    });
}

module.exports = {
    weatherRequest: weatherRequest,
    address: address,
    automatic: automatic
};