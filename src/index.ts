#!/usr/bin/env node

/**
 * Created by apizzimenti on 5/10/16.
 */

import https = require("https");
import parseArgs = require("minimist");
import Promise = require("bluebird");
import {IpConfig, AddrConfig} from "./lib/Config";

let get_ip = Promise.method(() => {
    return new Promise((resolve, reject) => {
        const request_options = {
            "host": "api.ipify.org",
            "method": "GET"
        };

        let chunks = "";

        https.get(request_options, (res) => {
            res.on("data", (chunk) => {
                chunks += chunk;
            }).on("end", () => {
                resolve(chunks);
            });
        }).on("error", (err) => {
            reject(err);
        }).end();
    });
});

let config,
    ip = get_ip().then((res) => {return res}),
    argv = parseArgs(process.argv.slice(2));

if (!(argv["z"] || argv["a"] || argv["address"] || argv["lat"] || argv["long"])) {
    config = new IpConfig(ip, argv);
} else {
    config = new AddrConfig(argv);
}
