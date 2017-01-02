#!/usr/bin/env node
/**
 * Created by apizzimenti on 1/1/17.
 */

var weather = require("./weather");

weather.ip(weather.location);

module.exports = {
    ip: weather.ip,
    location: weather.location
};
