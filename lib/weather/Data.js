#!/usr/bin/env node
/**
 * Created by apizzimenti on 1/1/17.
 */

var r = require("request"),
    tools = require("../tools"),
    
    Error = tools.Error;

function ip (callback) {
    
    var msg = "Either your computer is not connected to the internet properly or the service couldn't" +
        " find your external ip address.",
        e = new Error(msg);
    
    r("http://api.ipify.org", function (err, res, body) {
        
        if (err) {
            e.throw();
            return;
        }
        
        callback(body);
    })
}

function location (ip, callback) {
    
    var msg = "Either your computer isn't connected to the internet properly or the service couldn't" +
        " find your location.",
        e = new Error(msg),
        loc = {};
    
    r("http://freegeoip.net/json/" + ip, function (err, res, body) {
        
        if (err) {
            e.throw();
            return;
        }
        
        loc = new tools.location(JSON.parse(body));
        callback(loc, callback);
    });
}

module.exports = {
    ip: ip,
    location: location
};
