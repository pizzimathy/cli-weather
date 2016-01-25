/**
 * Created by apizzimenti on 12/29/15.
 */

var chalk = require('chalk'),
    red = chalk.red,
    blue = chalk.blue,
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
    var highs = [],
        temp,
        point;

    data.forEach(function (obj) {
        point = Math.ceil(obj.temperatureMax);
        temp = 'high: ' + (point > 32 ? chalk.red(point.toString() + units.tmp) : chalk.blue(point.toString() + units.tmp));
        highs.push(temp);
    });

    return highs;
}

function collectLows(data, units) {
    var lows = [],
        temp,
        point;

    data.forEach(function (obj) {
        point = Math.floor(obj.temperatureMin);
        temp = 'low: ' + (point > 32 ? chalk.red(point.toString() + units.tmp) : chalk.blue(point.toString() + units.tmp));
        lows.push(temp);
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

    var temp = (now.temperature > 32 ? chalk.red(Math.ceil(now.temperature) + units.tmp) : chalk.blue(Math.floor(now.temperature) + units.tmp)),
        wind = (now.windSpeed % 1 ? Math.floor(now.windSpeed) : Math.ceil(now.windSpeed)) + units.speed + ' wind';

    current += temp + ' -- ' + wind + ' -- ' + now.summary.toLowerCase();

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

    return Table.toString();
}

function icon(array) {
    var icons = [];

    array.forEach(function (point) {
        var name = point.icon;
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
            case 'fog':
                icons.push('☁ fog');
                break;
            case 'partly-cloudy-day':case 'partly-cloudy-night':
                icons.push('☁☀ partly cloudy');
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