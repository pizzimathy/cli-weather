/**
 * Created by apizzimenti on 1/21/16.
 */

var assert = require('assert'),
    format = require('././format');

describe('format', function () {
    it('is a constructor of the Format object', function () {
        var flag = typeof(format) === 'function';
        assert(flag);
    });
});