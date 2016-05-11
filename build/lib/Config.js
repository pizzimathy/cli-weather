/**
 * Created by apizzimenti on 5/10/16.
 */
"use strict";
var IpConfig = (function () {
    function IpConfig(ip, argv) {
        this.ip = ip;
        this.argv = argv;
        this.units = argv["c"] || "f";
    }
    return IpConfig;
}());
exports.IpConfig = IpConfig;
var AddrConfig = (function () {
    function AddrConfig(argv) {
        this.addr = argv["address"] || argv["z"] || argv["a"];
        this.argv = argv;
        this.units = argv["c"] || "f";
    }
    return AddrConfig;
}());
exports.AddrConfig = AddrConfig;
