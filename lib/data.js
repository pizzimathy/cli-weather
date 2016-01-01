/**
 * Created by apizzimenti on 12/29/15.
 */

var clc = require('cli-color'),
    red = clc.red,
    blue = clc.blue,
    table = require('cli-table');

function collectDates(data) {
    var dates = [];

    data.forEach(function (obj) {
        var date = new Date(obj.time * 1000);
        dates.push(date.toDateString());
    });

    return dates;
}

function collectHighs(data, units) {
    var highs = [];

    data.forEach(function (obj) {
        highs.push('high: ' + Math.floor(obj.temperatureMax).toString() + units.tmp);
    });

    return highs;
}

function collectLows(data, units) {
    var lows = [];

    data.forEach(function (obj) {
        lows.push('low: ' + Math.floor(obj.temperatureMin).toString() + units.tmp);
    });

    return lows;
}

function collectSummary(data) {
    var summaries = [];

    data.forEach(function (obj) {
        summaries.push(obj.summary.toLowerCase());
    });

    return summaries;
}

function display(now, units) {

    var current = '\nCurrent Conditions:\n------------------\n';

    current += (now.temperature >= (units.tmp == "˚F" ? 32 : 0) ? clc.red(Math.floor(now.temperature) + units.tmp) : clc.blue(Math.floor(now.temperature) + units.tmp)) +
            ' - ' + (now.windSpeed % 1 ? Math.floor(now.windSpeed) : Math.ceil(now.windSpeed)) + units.speed + ' wind - ' +
            now.summary.toLowerCase() + '\n';

    return current;

}

function displayTable(headers, highs, lows, icons) {
    var Table = new table({
        head: headers,
        chars: {
            'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''
        }
    });

    Table.push(highs, lows, icons);

    return Table.toString()
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
}

module.exports = {
    collectDates: collectDates,
    collectHighs: collectHighs,
    collectLows: collectLows,
    collectSummary: collectSummary,
    display: display,
    displayTable: displayTable,
    icon: icon
};