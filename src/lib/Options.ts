/**
 * Created by apizzimenti on 5/9/16.
 */

/// <reference path="../../typings/main.d.ts" />

import https = require("https");
import http = require("http");
import {Config} from "./Config";

export default class Options {
    loc: string;
    lat: string;
    long: string;
    args: string;

    constructor(config: Config) {
        this.args = config.argv;
        if (config.ip) {
            let loc_info = ip_loc(config.ip);
            this.loc = loc_info.loc;
            this.lat = loc_info.lat;
            this.long = loc_info.long;
        } else {
            let loc_info = address_loc(config.address);
            this.loc = loc_info.loc;
            this.lat = loc_info.lat;
            this.long = loc_info.long;
        }
    };
}

export function ip_loc (ip: string): {loc: string, lat: string, long: string} {
    const request_options = {
        host: "freegeoip.net",
        path: "json/" + ip,
        method: "GET"
    };

    let loc_info = {
        loc: null,
        lat: null,
        long: null
    },
        chunks: string = "";

    http.get(request_options, (res) => {
        res
            .on("data", (chunk) => {
                chunks += chunk;
            })
            .on("end", () => {
                let json = JSON.parse(chunks);
                loc_info.loc = json.city + ", " + json.region_name + ", " + json.country_name;
                loc_info.lat = json.latitude;
                loc_info.long = json.longitude;
            });

    }).on("error", (err) => {
        console.log(`got \n\t${err}\nfrom the geoip server.`);
    });

    return loc_info;
}

export function address_loc(address: string): {loc: string, lat: string, long: string} {
    const request_options = {
        host: "maps.googleapis.com",
        path: "/maps/api/geocode/json?address=" + encodeURIComponent(address),
        method: "GET"
    };

    let loc_info = {
        loc: null,
        lat: null,
        long: null
    },
        chunks: string = "";

    https.get(request_options, (res) => {
        res
            .on("data", (chunk) => {
                chunks += chunk;
            })
            .on("end", () => {
                let json = JSON.parse(chunks).results[0];
                loc_info.loc = json.formatted_address;
                loc_info.lat = json.geometry.location.lat;
                loc_info.long = json.geometry.location.long;
            });

    }).on("error", (err) => {
        console.log(`got \n\t${err}\nfrom the Google Maps server.`);
    });

    return loc_info;
}
