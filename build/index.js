#!/usr/bin/env node
"use strict";
var https = require("https");
var parseArgs = require("minimist");
var Promise = require("bluebird");
var Config_1 = require("./lib/Config");
var get_ip = Promise.method(function () {
    return new Promise(function (resolve, reject) {
        var request_options = {
            "host": "api.ipify.org",
            "method": "GET"
        };
        var chunks = "";
        https.get(request_options, function (res) {
            res.on("data", function (chunk) {
                chunks += chunk;
            }).on("end", function () {
                resolve(chunks);
            });
        }).on("error", function (err) {
            reject(err);
        }).end();
    });
});
var config, ip = get_ip().then(function (res) { return res; }), argv = parseArgs(process.argv.slice(2));
if (!(argv["z"] || argv["a"] || argv["address"] || argv["lat"] || argv["long"])) {
    config = new Config_1.IpConfig(ip, argv);
}
else {
    config = new Config_1.AddrConfig(argv);
}
