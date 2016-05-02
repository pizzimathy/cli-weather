#! /usr/bin/env node

/**
 * Created by apizzimenti on 12/27/15.
 */

// dependencies

var publicIp = require('public-ip'),
    chalk = require('chalk'),
    conf = require('./lib/config'),
    events = require('events');

var units = {
        type: 'us',
        tmp: '˚F',
        speed: 'mph'
    };

var ip = '';

// gets public ip address
publicIp(function (err, res) {

    if (err) {
        console.log(chalk.red('✗ couldn\'t find public ip address'));
    } else if (res) {
        ip = res;
    }
});

// new Config instance, initializes the app
var Config = new conf(units, ip);
Config.sudo();

// credit to Forecast.io
console.log(chalk.dim('powered by Forecast.io'));