/**
 * Created by apizzimenti on 1/1/17.
 */

/**
 * @module tools
 */

var cols = process.stdout.columns,
    chalk = require("chalk"),
    wrap = require("wordwrap")(4, cols),
    pkg = require("../../package.json");
    

/**
 * @author Anthony Pizzimenti
 *
 * @desc This class throws well-formatted errors and exits out of the current process peacefully.
 *
 * @param {string} [message=""] Message to be displayed when the error is thrown.
 *
 * @property {string} message Message to be displayed when the error is thrown.
 *
 * @class Error
 *
 * @constructor
 */
function Error (message) {
    
    if (typeof message == "string" && message !== undefined && message !== null) {
        this.message = message;
    } else {
        this.message = "";
    }
}


/**
 * @author Anthony Pizzimenti
 *
 * @desc Displays error message and issue url, then quits the current process.
 *
 * @this Error
 *
 * @returns {undefined}
 */
Error.prototype.throw = function () {
    
    console.log();
    console.log(wrap(chalk.bold.red("Error:") + "\n" + chalk.red(this.message)));
    console.log();
    console.log(wrap(chalk.bold("If you feel that this is an error in the application's programming and not with your" +
        " internet connection, please submit an issue ticket at " + pkg.bugs.url)));
    console.log();
    
    process.exit(0);
};


/**
 * @author Anthony Pizzimenti
 *
 * @desc Returns the message assigned to the Error object.
 *
 * @this Error
 *
 * @returns {string} Message assigned to this Error object.
 */
Error.prototype.message = function () {
    return this.message;
};

module.exports = {
    Error: Error
};
