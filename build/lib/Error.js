/**
 * Created by apizzimenti on 6/8/16.
 */
"use strict";
var chalk = require("chalk");
var fs = require("fs");
var p = require("path");
var Err = (function () {
    function Err(message, color, type, argv) {
        this.message = message;
        this.type = type;
        this.argv = argv;
        var date = new Date();
        this.date = date.toDateString();
        this.time = date.toTimeString();
        process.stdout.write(chalk[color].(type + "\n" + message));
        this.log();
    }
    Err.prototype.log = function () {
        var json = JSON.stringify(this), path = p.join(p.dirname(require.main.filename) + "/config/error_log.json");
        fs.writeFile(path, json, { encoding: "uft8", flag: "w" }, function (error) {
            if (error) {
                console.log(error);
            }
        });
    };
    return Err;
}());
exports.Err = Err;
