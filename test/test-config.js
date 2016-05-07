/**
 * Created by apizzimenti on 1/21/16.
 */

var assert = require('assert'),
    config = require('././config');

var units = {
        prop_1: 1,
        prop_2: 2
    },
    ip = '1101';

var Config = config(units, ip);

describe('Config', function () {
    it('has 3 props', function () {
        assert(Object.keys(Config).length === 3);
    });

    it('after construction, 2 props are populated', function () {
        var count = 0;

        Object.keys(Config).forEach(function (key) {
            key !== null || key !== '' ? count++ : count;
        });
        assert(count, 2);
    });

    it('has correct key types', function () {
        Object.keys(Config).forEach(function (key) {
            assert(typeof(key) === 'object' || typeof(key) === 'string');
        })
    });
});