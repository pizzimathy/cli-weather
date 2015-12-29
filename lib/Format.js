/**
 * Created by apizzimenti on 12/28/15.
 */

var data = require('./data');

function Format(json) {
    var obj = JSON.parse(json),
        current = obj.currently,
        predict = obj.daily.data.slice(1, 4);

    this.weather = data.display(current, data.collectDates(predict), data.collectHighs(predict),
        data.collectLows(predict), data.collectSummary(predict), data.icon(predict));
}

function instance(json) {
    return new Format(json);
}

module.exports = instance;