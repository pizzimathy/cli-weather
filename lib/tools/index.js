/**
 * Created by apizzimenti on 1/1/17.
 */

var e = require("./Error"),
    h = require("./Globals"),
    o = require("./Output");

module.exports = {
    Error: e.Error,
    paramExist: h.paramExist,
    Location: h.Location,
    Weather: h.Weather,
    Output: o.Output,
    realTime: h.realTime,
    hotCold: h.hotCold,
    tableContent: h.tableContent
};
