/**
 * Created by apizzimenti on 5/10/16.
 */
"use strict";

var https = require("https");
var argv = require("minimist");
var Config_1 = require("./lib/Config");
var config;
if (!(argv["z"] || argv["a"] || argv["address"] || argv["lat"] || argv["long"])) {
    config = new Config_1.IpConfig(get_ip(), argv);
}
else {
    config = new Config_1.AddrConfig(argv);
}
function get_ip() {
    var request_options = {
        "host": "https://api.ipify.org",
        "path": "?format=json",
        "method": "GET"
    };
    var chunks = "", data = "";
    https.get(request_options, function (res) {
        res
            .on("data", function (chunk) {
            chunks += chunk;
        })
            .on("end", function () {
            data = JSON.parse(chunks)["ip"];
        });
    });
    return data;
}
exports.get_ip = get_ip;
