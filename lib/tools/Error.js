#!/usr/bin/env node
/**
 * Created by apizzimenti on 1/1/17.
 */

var cols = process.stdout.columns,
    chalk = require("chalk"),
    wrap = require("wordwrap")(4, cols);

function Error (message) {
    this.message = message;
}

Error.prototype.throw = function () {
    console.log(wrap(chalk.red("Error:\n" + this.message)));
};

Error.prototype.message = function () {
    return message;
};

module.exports = {
    Error: Error
};
