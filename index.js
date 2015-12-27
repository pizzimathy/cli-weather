#! /usr/bin/env node

/**
 * Created by apizzimenti on 12/27/15.
 */

// dependencies

var http = require('http'),
    publicIp = require('public-ip'),
    clc = require('cli-color');

/**
 * @desc converts temperature
 * @param temp - integer literal; temperature in kelvin
 * @returns {string}
 */
function KtoF(temp) {
    return Math.floor((temp * 1.8) - 459.67).toString() + '°';
}

/**
 * @desc formats JSON
 * @param json - javascript object containing weather information
 * @returns {string}
 */
function format(json) {
    var weather =
        '\nCurrent Conditions: ' + KtoF(json.main.temp) + ', ' + json.weather[0].description + '\n' +
        'High: ' + clc.red(KtoF(json.main.temp_max)) + '\n' +
        'Low: ' + clc.blue(KtoF(json.main.temp_min)) + '\n';

    return weather;
}

// gets public ip address

var ip = '';

publicIp(function (err, res) {

    if (err) {
        console.log(clc.red('˟ couldn\'t find public ip address'));
    } else if (res) {
        ip = res;
        console.log(clc.green('✓ got ip address'));
    }
});

var location_options = {
        host: 'freegeoip.net',
        path: '/json/' + ip,
        method: 'GET'
    };

// gets location based on retrieved public ip

var location = '',
    city = '',
    country = '';

http.get(location_options, function (res) {
    var text = '';
    res
        .on('data', function (chunk) {
            console.log(clc.green('✓ got location server response'));
            text +=  chunk.toString();
        })
        .on('end', function () {
            var json = JSON.parse(text);
            location = json.city + ', ' + json.region_name + ', ' + json.country_name;
            city = json.city;
            country = json.country_code;
            console.log(clc.green('✓ got location: ') + clc.bgBlack.white(location));

            // sends HTTP request to weather server
            var weather_options = {
                    host: 'api.openweathermap.org',
                    path: '/data/2.5/weather?q=' + city + ',' + country.toLowerCase() + '&appid=0267bb2cee53db2d216fc1394801780d',
                    method: 'GET'
                },
                weather = '';

            http.get(weather_options, function(res) {
                var text = '';
                res
                    .on('data', function (chunk) {
                        console.log(clc.green('✓ got data from weather server'));
                        text += chunk.toString();
                    })
                    .on('end', function() {
                        json = JSON.parse(text);
                        console.log(format(json));
                    })
            });
        })
});