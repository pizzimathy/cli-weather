/**
 * Created by apizzimenti on 1/2/17.
 */

/**
 * @module tools
 */

var paramExist = require("./Globals").paramExist,
    Error = require("./Error").Error;

/**
 * @author Anthony Pizzimenti
 *
 * @desc Maps the argstring's properties based on the config object's options.
 *
 * @param args {object} An argstring.
 * @param config {object} Specified desired property names and their possible parameters in the argstring.
 *
 * @constructor
 *
 * @property args {object} An argstring.
 * @property config {object} Specified desired property names and their possible parameters in the argstring.
 *
 * @class Args
 */

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

/**
 * @author Anthony Pizzimenti
 *
 * @desc For each argument and argument list in the property config, see if any exist in the argstring; if so, create a
 * new property with the desired name in the flattened object, and break.
 *
 * @property flattened {object} Properties from the argstring mapped to the provided property names in the config.
 *
 * @this Args
 *
 * @private
 */

Args.prototype._configure = function () {
    
    var name;
    
    this.flattened = {};
    
    // for each argument in the config object,
    for (var arg in this.config) {
        
        if (this.config.hasOwnProperty(arg)) {
            
            // take its list of properties,
            for (var i = 0; i < this.config[arg].length; i++) {
                
                name = this.config[arg][i];
                
                // and if any of them exist on the argstring, apply that property to flatten, but hash it with the
                // desired property name from the config object.
                
                if (this.args[name]) {
                    this.flattened[arg] = Object.keys(this.args[name]).length == 0 ? null : this.args[name];
                    break;
                }
            }
        }
    }
};

/**
 * @author Anthony Pizzimenti
 *
 * @desc Return the desired property value if it exists; otherwise return null.
 *
 * @param arg {string} The property to search for.
 *
 * @this Args
 *
 * @returns {object | null}
 */

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
