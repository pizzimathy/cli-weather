/**
 * Created by apizzimenti on 5/9/16.
 */
"use strict";
var https = require("https");
var http = require("http");
var Promise = require("bluebird");
var Options = (function () {
    function Options(config) {
        this.args = config.argv;
        if (config.ip) {
            var loc_info = ip_loc(config.ip);
            this.loc = loc_info.loc;
            this.lat = loc_info.lat;
            this.long = loc_info.long;
        }
        else {
            var loc_info = address_loc(config.address);
            this.loc = loc_info.loc;
            this.lat = loc_info.lat;
            this.long = loc_info.long;
        }
    }
    ;
    return Options;
}());
exports.Options = Options;
var ip_loc = Promise.method(function (ip) {
    return new Promise(function (resolve, reject) {
        var request_options = {
            host: "freegeoip.net",
            path: "json/" + ip,
            method: "GET"
        };
        var loc_info = {
            loc: null,
            lat: null,
            long: null
        }, chunks = "";
        http.get(request_options, function (res) {
            res
                .on("data", function (chunk) {
                chunks += chunk;
            })
                .on("end", function () {
                var json = JSON.parse(chunks);
                loc_info.loc = json.city + ", " + json.region_name + ", " + json.country_name;
                loc_info.lat = json.latitude;
                loc_info.long = json.longitude;
                resolve(loc_info);
            });
        }).on("error", function (err) {
            console.log("got \n\t" + err + "\nfrom the geoip server.");
        });
    });
});
exports.ip_loc = ip_loc;
var address_loc = Promise.method(function (address) {
    return new Promise(function (resolve, reject) {
        var request_options = {
            host: "maps.googleapis.com",
            path: "/maps/api/geocode/json?address=" + encodeURIComponent(address),
            method: "GET"
        };
        var loc_info = {
            loc: null,
            lat: null,
            long: null
        }, chunks = "";
        https.get(request_options, function (res) {
            res
                .on("data", function (chunk) {
                chunks += chunk;
            })
                .on("end", function () {
                var json = JSON.parse(chunks).results[0];
                loc_info.loc = json.formatted_address;
                loc_info.lat = json.geometry.location.lat;
                loc_info.long = json.geometry.location.long;
                resolve(loc_info);
            });
        }).on("error", function (err) {
            console.log("got \n\t" + err + "\nfrom the Google Maps server.");
        });
    });
});
exports.address_loc = address_loc;
