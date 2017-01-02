#!/usr/bin/env node
/**
 * Created by apizzimenti on 1/1/17.
 */

var weather = require("./weather"),
    help = require("./tools").Help,
    
    min = require("minimist")(process.argv.slice(1)),
    chalk = require("chalk"),
    
    Help = new help(
        "cli-weather",
        "Retrieves weather for your current location or an input location.",
        {
            "celsius": " -c || --celsius → Changes all units to si units (Celsius degrees/meters per second).",
            "help": " -h || --help → Displays this help page."
        }
    );
    
if (min.h || min.help) {
    Help.display();
    process.exit(0);
}

weather.ip(min, weather.location);

module.exports = {
    ip: weather.ip,
    location: weather.location
};
