/**
 * Created by apizzimenti on 12/28/15.
 */

/**
 * @desc formats JSON
 * @param json - javascript object containing weather information
 * @returns {string}
 */

var clc = require('cli-color');

exports = module.exports = Format;

function Format(json) {
    this.weeks = null;
}

function icon(array) {
    var icons = [];

    array.forEach(function (name) {
        switch (name) {
            case 'clear-day':case 'clear-night':
                icons.push('☀ clear');
                break;
            case 'rain':
                icons.push('☂ rain');
                break;
            case 'snow':
                icons.push('❄ snow');
                break;
            case 'sleet':
                icons.push('☂❄ sleet');
                break;
            case 'wind':
                icons.push(name);
                break;
            default:
                icons.push('☁ clouds');
                break;
        }
    });

    return icons;
};