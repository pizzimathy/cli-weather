#!/usr/bin/env node

/**
 * Created by apizzimenti on 1/1/17.
 */

var r = require("request"),
    tools = require("../tools"),
    p = require("../../private.json"),
    
    Error = tools.Error,
    Location = tools.Location,
    Weather = tools.Weather,
    Output = tools.Output;

/**
 * @author Anthony Pizzimenti
 *
 * @param callback
 */

function ip (callback) {
    
    var msg = "Either your computer is not connected to the internet properly or the service couldn't" +
        " find your external ip address.",
        e = new Error(msg);
    
    r("http://api.ipify.org", function (err, res, body) {
        
        if (err) {
            e.throw();
            return;
        }
        
        callback(body, weather);
    });
}

function location (ip, callback) {
    
    var msg = "The location service couldn't find where you are by your public ip.",
        e = new Error(msg),
        loc = {};
    
    r("http://freegeoip.net/json/" + ip, function (err, res, body) {
        
        if (err) {
            e.throw();
            return;
        }
        
        loc = new Location(JSON.parse(body));
        callback(loc, prettyprint);
    });
}

function weather (location, callback) {
    
    var lat = location.latitude,
        long = location.longitude,
        key = p.forecast_secret,
        url = "https://api.darksky.net/forecast/" + key + "/" + lat + "," + long + "?exclude=minutely,hourly,flags",
        
        msg = "The service couldn't retrieve the current weather for your location.",
        e = new Error(msg),
        
        w = {};
    
    r(url, function (err, res, body) {
        
        if (err) {
            e.throw();
            return;
        }
        
        w = new Weather(JSON.parse(body));
        callback(location, w);
    });
}

function prettyprint (location, weather) {
    
    var o = new Output(location, weather);
    o.print();
}

module.exports = {
    ip: ip,
    location: location,
    weather: weather
};
