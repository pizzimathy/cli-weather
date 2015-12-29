#! /usr/bin/env node

/**
 * Created by apizzimenti on 12/27/15.
 */

// dependencies

var http = require('http'),
    https = require('https'),
    publicIp = require('public-ip'),
    clc = require('cli-color'),
    parseArgs = require('minimist'),
    Format = require('./lib/Format');

var ip = '',
    location_options = {},
    location = '',
    lat,
    long;

// gets public ip address
publicIp(function (err, res) {

    if (err) {
        console.log(clc.red('˟ couldn\'t find public ip address'));
    } else if (res) {
        ip = res;
        console.log(clc.green('✓ got ip address'));
    }
});



var argv = parseArgs(process.argv.slice(2), opts={});

if (argv.address) {
    console.log(clc.green('✓ address: ') + clc.bgBlack.white(argv.address));
    location_options = {
        host: 'maps.googleapis.com',
        path: '/maps/api/geocode/json?address=' + encodeURIComponent(argv.address.toString()),
        method: 'GET'
    };
    http.get(location_options, function (res) {
        var text = '';
        res
            .on('data', function (chunk) {
                text +=  chunk.toString();
            })
            .on('end', function () {
                var json = JSON.parse(text);
                console.log(clc.green('✓ got geo location server response'));

                lat = json.results[0].geometry.location.lat;
                long = json.results[0].geometry.location.lng;

                // sends HTTP request to weather server
                weatherRequest();
            })
    });

} else if (argv.lat && argv.long) {
    lat = argv.lat;
    long = argv.long;
    console.log(clc.green('✓ manual lat long set'));

    // sends HTTP request to weather server
    weatherRequest();

} else {
    location_options = {
        host: 'freegeoip.net',
        path: '/json/' + ip,
        method: 'GET'
    };

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
}

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