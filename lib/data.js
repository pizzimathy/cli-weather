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

        point = Math.floor(obj.temperatureMax);

        if (units.tmp.includes('C')) {
            temp = 'high: ' + (point > 0 ? chalk.red(point + units.tmp) : chalk.blue(point + units.tmp));
        } else {
            temp = 'high: ' + (point > 32 ? chalk.red(point + units.tmp) : chalk.blue(point + units.tmp));
        }

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

        if (units.tmp.includes('C')) {
            temp = 'low: ' + (point > 0 ? chalk.red(point + units.tmp) : chalk.blue(point + units.tmp));
        } else {
            temp = 'low: ' + (point > 32 ? chalk.red(point + units.tmp) : chalk.blue(point + units.tmp));
        }

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

function collectPrecip(data) {

    var precips = [];

    data.forEach(function (obj) {
        precips.push(Math.ceil(obj.precipProbability * 100) + '% precip.');
    });

    return precips;

}

function formatTime(date) {
    var suffix = "am";
    var hours = date.getHours();

    if (hours > 12) {
        hours = hours - 12;
        suffix = "pm";
    } else if (hours == 12) {
        suffix = "pm";
    }
    if (hours < 10) {
        hours = " " + hours;
    }

    var minutes = date.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return hours + ":" + minutes + " " + suffix;
}

function collectSunrises(data) {
    var sunrises = [];

    data.forEach(function (obj) {
        if(obj.sunriseTime) {
            var sunrise = new Date(obj.sunriseTime * 1000);
            sunrises.push('☀ ' + formatTime(sunrise));
        } else {
            sunrises.push('');
        }
    });

    return sunrises;
}
function collectSunsets(data) {
    var sunsets = [];

    data.forEach(function (obj) {
        if(obj.sunsetTime) {
            var sunset = new Date(obj.sunsetTime * 1000);
            sunsets.push('☾ ' + formatTime(sunset));
        } else {
            sunsets.push('');
        }
    });

    return sunsets;
}

function display(now, units) {


    var current = '\nCurrent Conditions:\n------------------\n',
        temp = '';

    if (units.c) {
        temp = (now.temperature > 0 ? chalk.red(Math.ceil(now.temperature) + units.tmp) : chalk.blue(Math.floor(now.temperature) + units.tmp)) + ' -- feels like ' +
            (now.apparentTemperature > 0 ? chalk.red(Math.ceil(now.apparentTemperature) + units.tmp) : chalk.blue(Math.floor(now.apparentTemperature)));
    } else {
        temp = (now.temperature > 32 ? chalk.red(Math.ceil(now.temperature) + units.tmp) : chalk.blue(Math.floor(now.temperature) + units.tmp)) + ' -- feels like ' +
            (now.apparentTemperature > 32 ? chalk.red(Math.ceil(now.apparentTemperature) + units.tmp) : chalk.blue(Math.floor(now.apparentTemperature) + units.tmp));
    }

    var wind = (now.windSpeed % 1 ? Math.floor(now.windSpeed) : Math.ceil(now.windSpeed)) + units.speed + ' wind';

    current += temp + ' -- ' + wind + ' -- ' + now.summary.toLowerCase();

    return current + '\n';
}

function displayTable(headers, highs, lows, icons, precips, sunrises, sunsets) {
    var Table = new table({
        head: headers,
        chars: {
            'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''
        },
        style: {
            head:['dim']
        }
    });

    Table.push(highs, lows, icons, precips, sunrises, sunsets);

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
                icons.push('➳ wind');
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
    collectPrecip: collectPrecip,
    collectSunrises: collectSunrises,
    collectSunsets: collectSunsets,
    display: display,
    displayTable: displayTable,
    icon: icon
};
