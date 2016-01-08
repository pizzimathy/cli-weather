/**
 * Created by apizzimenti on 12/28/15.
 */

var data = require('./data');

function Format(json, units) {
    var obj = JSON.parse(json),
        current = obj.currently,
        predict = obj.daily.data.slice(1, 5);

    this.dates = data.collectDates(predict);
    this.highs = data.collectHighs(predict, units);
    this.lows = data.collectLows(predict, units);
    this.summaries = data.collectSummary(predict);
    this.icons = data.icon(predict);

    this.currentWeather = data.display(current, units);
}

Format.prototype.tabled = function () {
    return data.displayTable(this.dates, this.highs, this.lows, this.icons);
};

function instance(json, units) {
    return new Format(json, units);
}

module.exports = instance;