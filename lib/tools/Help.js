/**
 * Created by apizzimenti on 1/2/17.
 */

var chalk = require("chalk"),
    
    paramExist = require("./Globals").paramExist;

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
