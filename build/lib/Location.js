/**
 * Created by apizzimenti on 5/9/16.
 */
"use strict";
var axios = require("axios");
var Error_1 = require("./Error");
var Location = (function () {
    function Location(config) {
        this.config = config;
        if (this.config.ip) {
            ip_loc(this.config.ip, this);
        }
        else if (!this.config.ip) {
            address_loc(this.config.address, this);
        }
    }
    ;
    return Location;
}());
exports.Location = Location;
var ip_loc = function (ip, context) {
    var req = axios.get("https://freegeoip.net/json/" + ip);
    req.then(function (res) {
        context.loc = res.data.city;
        context.lat = res.data.latitude;
        context.long = res.data.longitude;
    });
    req.catch(function (error) {
        var message = "The server at " + error.config.url + " did not respond", color = "yellow", type = "no_response", e = new Error_1.Err(message, color, type, context.argv);
    });
};
exports.ip_loc = ip_loc;
var address_loc = function (address, context) {
    var req = axios.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address.toString()));
    req.then(function (res) {
        var data = res.data.results[0];
        context.loc = address + ", " + data.address_components[2].long_name + ", " + data.address_components[3].long_name;
        context.lat = res.data.results[0].geometry.location.lat;
        context.long = res.data.results[0].geometry.location.long;
    });
    req.catch(function (error) {
        var message = "The server at " + error.config.url + " did not respond.", color = "yellow", type = "no_response", e = new Error_1.Err(message, color, type, context.argv);
    });
};
