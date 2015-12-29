/**
 * Created by apizzimenti on 12/28/15.
 */

/**
 * @desc formats JSON
 * @param json - javascript object containing weather information
 * @returns {string}
 */

var clc = require('cli-color');

module.exports = Format;

function Format (json) {
    var obj = JSON.parse(json),
        now = obj.currently,
        predict = obj.daily.data.splice(1, 4),
        dates = [],
        maxtemps = [],
        mintemps = [],
        icons = [],

        current;

    predict.forEach (function (obj) {
        var date = new Date(obj.time * 1000),
            formatted = date.toDateString();

        dates.push(formatted);
        maxtemps.push(Math.floor(obj.temperatureMax).toString() + '˚');
        mintemps.push(Math.floor(obj.temperatureMin).toString() + '˚');
        icons.push(predict.icon);
    });

    current =
        '\nCurrent Conditions\n' +
        '==================\n' +
        (now.temperature >= 32 ? clc.red(Math.floor(now.temperature)) : clc.blue(Math.floor(now.temperature)) + clc.blue('˚')) +
        ' - ' + Math.floor(now.windSpeed).toString() + 'mph wind - ' +
        now.summary.toLowerCase() + ' - ' + (now.precipProbability * 100) + '% chance of precipitation\n';

    return {
        current: current,
        week: week(dates, maxtemps, mintemps, icon(icons))
    }
}

function week(dates, maxtemp, mintemp, icons) {
    return dates[0] + '|\t' + dates[1] + '|\t' + dates[2] + '\n' +
        clc.red(maxtemp[0]) + '|\t\t' +  clc.red(maxtemp[1]) + '|\t\t' + clc.red(maxtemp[2]) + '|\n' +
        clc.blue(mintemp[0]) + '|\t\t' + clc.blue(mintemp[1]) + '|\t\t' + clc.blue(mintemp[2]) + '|\n' +
        icons[0] + '|\t\t' + icons[1] + '|\t\t' + icons[2] + '|\n';
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