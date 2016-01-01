#! /usr/bin/env node

/**
 * Created by apizzimenti on 12/27/15.
 */

// dependencies

var publicIp = require('public-ip'),
    clc = require('cli-color'),
    config = require('./lib/config');


var ip = '',
    units = {
        type: 'us',
        tmp: '˚F',
        speed: 'mph'
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

var Config = new config(units, ip);

Config.control();