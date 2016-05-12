/**
 * Created by apizzimenti on 5/10/16.
 */

import https = require("https");
import argv = require("minimist");
import {Config, IpConfig, AddrConfig} from "./lib/Config";

let config: Config;

if (!(argv["z"] || argv["a"] || argv["address"] || argv["lat"] || argv["long"])) {
    config = new IpConfig(get_ip(), argv);
} else {
    config = new AddrConfig(argv);
}

export function get_ip(): string {
    const request_options = {
        "host": "https://api.ipify.org",
        "path": "?format=json",
        "method": "GET"
    };

    let chunks: string = "",
        data: string = "";
    https.get(request_options, (res) => {
        res
            .on("data", (chunk) => {
                chunks += chunk;
            })
            .on("end", () => {
                data = JSON.parse(chunks)["ip"];
            });
    });

    return data;
}