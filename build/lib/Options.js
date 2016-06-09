/**
 * Created by apizzimenti on 5/9/16.
 */
"use strict";
var axios = require("axios");
var Location = (function () {
    function Location(config) {
        this.argv = config.argv;
        if (config.ip) {
            ip_loc(config.ip, this);
        }
        else if (!config.ip) {
            address_loc(this.argv.address || this.argv.a || this.argv.z, this);
        }
    }
    ;
    return Location;
}());
exports.Location = Location;
var ip_loc = function (ip, context) {
    axios.get("https://freegeoip.net/json/" + ip)
        .then(function (res) {
        context.loc = res.data.city;
        context.lat = res.data.latitude;
        context.long = res.data.longitude;
    }).catch(function (err) {
        console.log(err);
    });
};
exports.ip_loc = ip_loc;
var address_loc = function (address, context) {
    axios.get("http://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address.toString()))
        .then(function (res) {
        var data = res.data.results[0], location = address + ", " + data.address_components[2].long_name + ", " + data.address_components[3].long_name;
        context.loc = location;
        context.lat = res.data.results[0].geometry.location.lat;
        context.long = res.data.results[0].geometry.location.lat;
    }).catch(function (err) {
        console.log(err);
    });
};
