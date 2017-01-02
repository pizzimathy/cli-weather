/**
 * Created by apizzimenti on 1/2/17.
 */

var paramExist = require("./Globals").paramExist,
    Error = require("./Error").Error,
    
    chalk = require("chalk");

function status (message, bad) {
    
    var e = new Error(),
        b = paramExist(bad, "boolean");
    
    if (paramExist(message, "string")) {
        
        if (b) {
            console.log(chalk.green("✓ " + message));
        } else {
            console.log(chalk.red("✗ " + message));
        }
    } else {
        e.message = "No status message was provided."
        e.throw();
    }
}

module.exports = {
    status: status
};
