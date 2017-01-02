#!/usr/bin/env node
/**
 * Created by apizzimenti on 1/1/17.
 */

var weather = require("./weather");

weather.config_weather();

module.exports = {
    weather: weather
};
