/**
 * Created by apizzimenti on 1/8/16.
 */


var data = require('./data');

function Format(json, units) {
    var obj = JSON.parse(json),
        current = obj.currently,
        predict = obj.daily.data.slice(1, 5);

    this.dates = data.collectDates(predict);
    this.highs = data.collectHighs(predict, units);
    this.lows = data.collectLows(predict, units);
    this.precips = data.collectPrecip(predict);
    this.summaries = data.collectSummary(predict);
    this.icons = data.icon(predict);
    this.sunrises = data.collectSunrises(predict);
    this.sunsets = data.collectSunsets(predict);

    this.currentWeather = data.display(current, units);
}

Format.prototype.tabled = function () {
    return data.displayTable(this.dates, this.highs, this.lows, this.icons, this.precips, this.sunrises, this.sunsets);
};

function instance(json, units) {
    return new Format(json, units);
}

module.exports = instance;
