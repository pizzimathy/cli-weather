#!/usr/bin/env node
/**
 * Created by apizzimenti on 1/1/17.
 */

var http = require("http"),
    external = require("external-ip")(),
    tools = require("../tools");

function ip (callback) {
    
    var msg = "Either your computer is not connected to the internet properly or the service couldn't" +
        " find your external ip address.",
        e = new tools.Error(msg);
    
    external(function (err, ip) {
        
        if (err) {
            e.throw();
            return;
        }
        
        console.log(ip);
    });
}

module.exports = {
    "ip": ip
};
