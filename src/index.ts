#!/usr/bin/env node

/**
 * Created by apizzimenti on 5/10/16.
 */

import parse = require("minimist");
import axios = require("axios");
import {IpConfig, AddrConfig} from "./lib/Config";
import {Location} from "./lib/Location";

let args = parse(process.argv.slice(2));

if (!(args["address"] || args["a"] || args["z"] || args["lat"] || args["long"])) {

    axios.get("https://api.ipify.org?format=json")
        .then((res) => {

            let config = new IpConfig(res.data.ip, args),
                loc = new Location(config);
        })
        .catch((err) => {
            console.log(err);
        });

} else {

    let config = new AddrConfig(args),
        loc = new Location(config);
}
