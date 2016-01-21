/**
 * Created by apizzimenti on 1/21/16.
 */

var assert = require('assert'),
    config = require('./../lib/config');

var units = {
        prop_1: 1,
        prop_2: 2
    },
    ip = '1101';

var Config = new config(units, ip),
    flag = false;

if (typeof(Config) === 'object') {
    flag = true;
}

assert(flag, 'Config is not an object');