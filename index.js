#! /usr/bin/env node

/**
 * Created by apizzimenti on 12/27/15.
 */

// dependencies

var publicIp = require('public-ip'),
    clc = require('cli-color'),
    parseArgs = require('minimist'),
    Format = require('./lib/Format'),
    args = require('./lib/args');

var ip = '',
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
    args.address(argv.address)
} else if (argv.lat && argv.long) {
    lat = argv.lat;
    long = argv.long;
    console.log(clc.green('✓ manual lat long set'));

    // sends HTTP request to weather server
    args.weatherRequest();
} else {
    args.automatic(ip);
}