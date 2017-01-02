/**
 * Created by apizzimenti on 1/1/17.
 */

var d = require("./Data"),
    o = require("./Output"),
    c = require("./Config");

module.exports = {
    ip: d.ip,
    ip_location: d.ip_location,
    p_location: d.p_location,
    weather: d.weather,
    prettyprint: d.prettyprint,
    Output: o.Output,
    config_weather: c.config_weather
};
