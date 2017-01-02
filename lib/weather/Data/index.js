/**
 * Created by apizzimenti on 1/1/17.
 */

var i = require("./ip"),
    l = require("./Location"),
    p = require("./Prettyprint"),
    w = require("./Weather");

module.exports = {
    ip: i.ip,
    ip_location: l.ip_location,
    p_location: l.p_location,
    prettyprint: p.prettyprint,
    weather: w.weather
};
