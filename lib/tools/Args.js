/**
 * Created by apizzimenti on 1/2/17.
 */

var paramExist = require("./Globals").paramExist,
    Error = require("./Error").Error;

function Args (args, config) {
    
    if (paramExist(args, "object")) {
        this.args = args;
    } else {
        this.args = {};
    }
    
    if (paramExist(config, "object")) {
        this.config = config;
    } else {
        this.config = {};
    }
    
    this._configure();
}

Args.prototype._configure = function () {
    
    var name;
    
    this.flattened = {};
    
    for (var arg in this.config) {
        
        if (this.config.hasOwnProperty(arg)) {
            
            for (var i = 0; i < this.config[arg].length; i++) {
                
                name = this.config[arg][i];
                
                if (this.args[name]) {
                    this.flattened[arg] = this.args[name];
                    break;
                }
            }
        }
    }
};

Args.prototype.get = function (arg) {
    
    var msg = "No argument supplied.",
        e = new Error(msg);
    
    if (paramExist(arg, "string")) {
        return this.flattened[arg] ? this.flattened[arg] : null;
    } else {
        e.throw();
    }
};

module.exports = {
    Args: Args
};
