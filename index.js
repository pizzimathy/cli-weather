#! /usr/bin/env node

/**
 * Created by apizzimenti on 12/27/15.
 */

// dependencies

var publicIp = require('public-ip'),
    clc = require('cli-color'),
    config = require('./lib/config'),
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
        console.log(clc.red('✗ couldn\'t find public ip address'));
    } else if (res) {
        ip = res;
    }
});

// new Config instance
var Config = new config(units, ip);
Config.sudo();

// update notifications
var updateNotifier = require('update-notifier'),
    col = clc.bgBlack.white,
    pkg = require('./package.json');

updateNotifier({pkg:pkg}).notify();