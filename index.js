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
    Format = require('./lib/Format'),
    args = require('./lib/args');

var ip = '',
    units = {
        type: 'us',
        tmp: '˚F',
        speed: 'mph',
    };

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

if (argv.c) {
    units = {
        type: 'si',
        tmp: '˚C',
        speed: 'mps',
    };
} 

if (address = argv.address || argv.a) {
    args.address(address, args.weatherRequest, units);

} else if (argv.lat && argv.long) {
    args.weatherRequest({lat: argv.lat, long: argv.long}, units);

} else {
    args.automatic(ip, args.weatherRequest, units);

}
