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
    console.log();
    console.log(wrap(chalk.red("Error:\n" + this.message)));
    console.log(wrap(chalk.bold("If you feel that this is an error in the application's programming and not with your" +
        " internet connection, please submit an issue ticket at " +
        chalk.bgWhite.black("github.com/apizzimenti/cli-weather/issues"))));
    console.log();
};

Error.prototype.message = function () {
    return message;
};

module.exports = {
    Error: Error
};
