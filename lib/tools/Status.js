/**
 * Created by apizzimenti on 1/2/17.
 */

/**
 * @module tools
 */

var paramExist = require("./Globals").paramExist,
    Error = require("./Error").Error,
    
    chalk = require("chalk");


/**
 * @author Anthony Pizzimenti
 *
 * @desc Displays a status message and ends the current process.
 *
 * @param {string} message Message to be displayed.
 * @param {boolean | null} [bad=null] If this parameter exists and is true, the message will be displayed in green. If
 * it is false or does not exist, the message is displayed in red.
 *
 * @throws Error
 *
 * @returns {undefined}
 */
function status (message, bad) {
    
    var e = new Error();
    
    if (paramExist(message, "string")) {
        
        if (bad) {
            console.log(chalk.green("✓ " + message));
        } else {
            console.log(chalk.red("✗ " + message));
        }
    } else {
        e.message = "No status message was provided.";
        e.throw();
    }
}

module.exports = {
    status: status
};
