/**
 * Created by apizzimenti on 5/9/16.
 */

import axios = require("axios");
import {Config} from "./Config";
import {Err} from "./Error";

export class Location {
    loc: string;
    lat: string;
    long: string;
    argv: string;

    constructor(config: Config) {
        this.argv = config.argv;
        if (config.ip) {
            ip_loc(config.ip, this);
        } else if (!config.ip) {
            address_loc(config.address, this);
        }
    };
}

let ip_loc = function (ip: string, context: Location) {
    let req = axios.get(`https://freegeoip.net/json/${ip}`);

    req.then((res) => {
        context.loc = res.data.city;
        context.lat = res.data.latitude;
        context.long = res.data.longitude;
    });

    req.catch((error) => {
        let message = `The server at ${error.config.url} did not respond`,
            color = "yellow",
            type = "no_response",
            e = new Err(message, color, type, context.argv);
    });
};

export {ip_loc};

let address_loc = function (address: string, context: Location) {
    let req = axios.get(`http://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address.toString())}`);

    req.then((res) => {
        let data = res.data.results[0];

        context.loc = `${address}, ${data.address_components[2].long_name}, ${data.address_components[3].long_name}`;
        context.lat = res.data.results[0].geometry.location.lat;
        context.long = res.data.results[0].geometry.location.long;
    });

    req.catch((error) => {
        let message = `The server at ${error.config.url} did not respond.`,
            color =  "yellow",
            type = "no_response",
            e = new Err(message, color, type, context.argv);
    });
};
