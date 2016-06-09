/**
 * Created by apizzimenti on 6/8/16.
 */

import chalk = require("chalk");
import fs = require("fs");
import p = require("path");

export class Err {

    message: string;
    type: string;
    argv: any;
    date: string;
    time: string;

    constructor (message: string, color: string, type: string, argv: any) {
        this.message = message;
        this.type = type;
        this.argv = argv;

        let date = new Date();
        this.date = date.toDateString();
        this.time = date.toTimeString();

        process.stdout.write(chalk[color](`${type}\n${message}`));
        this.log();
    }

    public log() {
        let json = JSON.stringify(this),
            path = p.join(p.dirname(require.main.filename) + "/config/error_log.json");

        fs.writeFile(path, json, {encoding: "uft8", flag: "w"}, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }
}


