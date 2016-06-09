#!/usr/bin/env node
"use strict";
var parse = require("minimist");
var axios = require("axios");
var Config_1 = require("./lib/Config");
var Location_1 = require("./lib/Location");
var args = parse(process.argv.slice(2));
if (!(args["address"] || args["a"] || args["z"] || args["lat"] || args["long"])) {
    axios.get("https://api.ipify.org?format=json")
        .then(function (res) {
        var config = new Config_1.IpConfig(res.data.ip, args), loc = new Location_1.Location(config);
    })
        .catch(function (err) {
        console.log(err);
    });
}
else {
    var config = new Config_1.AddrConfig(args), loc = new Location_1.Location(config);
}
