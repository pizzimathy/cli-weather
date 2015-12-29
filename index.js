#! /usr/bin/env node

/**
 * Created by apizzimenti on 12/27/15.
 */

// dependencies

var http = require('http'),
    https = require('https'),
    publicIp = require('public-ip'),
    clc = require('cli-color'),
    Format = require('./lib/Format');

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
    lat,
    long;

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
            lat = json.latitude;
            long = json.longitude;

            console.log(clc.green('✓ got location: ') + clc.bgBlack.white(location));

            // sends HTTP request to weather server
            weatherRequest();
        })
});

function weatherRequest() {
    var weather_options = {
            host: 'api.forecast.io',
            path: '/forecast/d399f7331297381cd6b95106add0d22d/' + lat.toString() + ',' + long.toString(),
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
                var weather = Format(json);
                console.log(weather.weather);
            })
    });
}