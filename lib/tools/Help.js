/**
 * Created by apizzimenti on 1/2/17.
 */

/**
 * @module tools
 */

var chalk = require("chalk"),
    
    paramExist = require("./Globals").paramExist;

/**
 * @author Anthony Pizzimenti
 *
 * @desc Displays help information.
 *
 * @param title {string} Package title.
 * @param description {string} Package description.
 * @param version {string} Current package version.
 * @param args {object} Argument description object.
 *
 * @property [title=""] {string} Package title.
 * @property [desc=""] {string} Package description.
 * @property [version=""] {string} Current package version.
 * @property [args={}] {object} Argument description object.
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
 * @returns {string}
 * @private
 */

Help.prototype._createHelpString = function () {
    
    var helpstring = "\n",
        key,
        value;
    
    for (var arg in this.args) {
        
        if (this.args.hasOwnProperty(arg)) {
            
            key = arg;
            value = this.args[arg];
            
            helpstring += ("\t" + chalk.dim(key) + " → " + (key.length > 4 ? "\t" : "\t\t") + value + "\n");
        }
    }
    
    return helpstring;
};

/**
 * @author Anthony Pizzimenti
 *
 * @description Displays helpstring and exits current process.
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
