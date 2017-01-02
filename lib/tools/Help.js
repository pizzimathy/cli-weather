/**
 * Created by apizzimenti on 1/2/17.
 */

var chalk = require("chalk"),
    
    paramExist = require("./Globals").paramExist;

function Help (title, description, args) {
    
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
}

Help.prototype._createHelpString = function () {
    
    var helpstring = "\n",
        key,
        value;
    
    for (var arg in this.args) {
        
        if (this.args.hasOwnProperty(arg)) {
            
            key = arg;
            value = this.args[arg];
            
            helpstring += ("\t" + chalk.dim(key) + " → " + value + "\n");
        }
    }
    
    return helpstring;
};

Help.prototype.display = function () {
    
    var _this = this;
    
    console.log("\n" + chalk.bold.underline(_this.title));
    console.log(_this.description);
    console.log(_this._createHelpString());
};

module.exports = {
    Help: Help
};
