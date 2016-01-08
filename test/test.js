/**
 * Created by apizzimenti on 1/7/16.
 */

var assert = require('assert'),
    config = require('./lib/config');

function configTest() {
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

    var obj_1 = config(units, ip),
        obj_2 = config(units, ip);
}