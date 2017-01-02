#!/usr/bin/env node

/**
 * Created by apizzimenti on 1/1/17.
 */

var r = require("request"),
    tools = require("../tools"),
    p = require("../../private.json"),
    
    Error = tools.Error,
    Location = tools.location,
    Weather = tools.weather;

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
        
        callback(body, current);
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
        callback(loc, daily);
    });
}

function current (location, callback) {
    
    var lat = location.latitude,
        long = location.longitude,
        key = p.forecast_secret,
        cur = "https://api.darksky.net/forecast/" + key + "/" + lat + "," + long + "?exclude=minutely,hourly,daily,flags",
        
        msg = "The service couldn't retrieve the current weather for your location.",
        e = new Error(msg),
        
        w = {};
    
    r(cur, function (err, res, body) {
        
        if (err) {
            e.throw();
            return;
        }
        
        w = new Weather(JSON.parse(body));
        callback(location);
    });
}

function daily (location, callback) {
    
    var lat = location.latitude,
        long = location.longitude,
        key = p.forecast_secret,
        day = "https://api.darksky.net/forecast/" + key + "/" + lat + "," + long + "?exclude=currently,minutely,hourly,flags",
        
        msg = "The service couldn't retrieve the daily weather for your location.",
        e = new Error(msg),
        
        w = {};
    
    r(day, function (err, res, body) {
        
        if (err) {
            e.throw();
            return;
        }
        
        w = new Weather(JSON.parse(body));
        console.log(w.daily.data.slice(0, 5));
    });
}

module.exports = {
    ip: ip,
    location: location
};
