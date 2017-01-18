/**
 * Created by apizzimenti on 1/2/17.
 */

/**
 * @module tools
 */

var chalk = require("chalk"),
    open = require("open"),
    
    paramExist = require("./Globals").paramExist;


/**
 * @author Anthony Pizzimenti
 *
 * @desc Displays help information.
 *
 * @param {string} title Package title.
 * @param {string} description Package description.
 * @param {string} version Current package version.
 * @param {object} args Argument description object.
 *
 * @property {string} [title=""] Package title.
 * @property {string} [desc=""] Package description.
 * @property {string} [version=""] Current package version.
 * @property {object} [args={}] Argument description object.
 *
 * @class Help
 *
 * @constructor
 */
function Help (title, description, version, args) {
    
    if (paramExist(args, "object")) {
        this.args = args;
    } else {
        this.args = {};
    }
    
    if (paramExist(description, "string")) {
        this.desc = description;
    } else {
        this.desc = "";
    }
    
    if (paramExist(title, "string")) {
        this.title = title;
    } else {
        this.title = "";
    }
    
    if (paramExist(version, "string")) {
        this.version = version;
    } else {
        this.version = "";
    }
}

/**
 * @author Anthony Pizzimenti
 *
 * @desc Generates a helpstring based on the properties provided in the argument configuration object.
 *
 * @returns {string} Formatted string containing help information.
 * @private
 */
Help.prototype._createHelpString = function () {
    
    var helpstring = "\n",
        key,
        value,
        arg;
    
    for (arg in this.args) {
        
        if (this.args.hasOwnProperty(arg)) {
            
            key = arg;
            value = this.args[arg];
            
            helpstring += "\t" + chalk.dim(key) + " → " + (key.length > 4 ? "\t" : "\t\t") + value + "\n";
        }
    }
    
    open("https://apizzimenti.github.io/cli-weather-docs/");
    return helpstring;
};

/**
 * @author Anthony Pizzimenti
 *
 * @description Displays helpstring and exits current process.
 *
 * @returns {undefined}
 */
Help.prototype.display = function () {
    
    var _this = this;
    
    console.log("\n" + chalk.bold.underline(_this.title + " v" + _this.version));
    console.log(_this.desc);
    console.log(_this._createHelpString());
    
    process.exit(0);
};

module.exports = {
    Help: Help
};
