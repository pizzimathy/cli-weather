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
 * @desc Maps the argstring's properties based on the config object's options.
 * @param {object} args An argstring.
 * @param {object} config Specified desired property names and their possible
 * parameters in the argstring.
 * @class {object} Args
 * @property {object} args An argstring.
 * @property {object} config Specified desired property names and their
 * possible parameters in the argstring.
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
 * @desc For each argument and argument list in the property config, see if any
 * exist in the argstring; if so, create a new property with the desired name
 * in the flattened object, and break.
 * @property {object} flattened Properties from the argstring mapped to the
 * provided property names in the config.
 * @this Args
 * @method
 * @private
 * @returns {undefined}
 */
Args.prototype._configure = function () {
    
    var name,
        arg,
        i;
    
    this.flattened = {};
    
    // for each argument in the config object,
    for (arg in this.config) {
        if (this.config.hasOwnProperty(arg)) {
            // take its list of properties,
            for (i = 0; i < this.config[arg].length; i++) {
                
                name = this.config[arg][i];
                
                // and if any of them exist on the argstring, apply that
                // property to flatten, but hash it with the desired property
                // name from the config object.
                if (this.args[name]) {
                    this.flattened[arg] = this.args[name];
                    break;
                }
            }
        }
    }
};


/**
 * @author Anthony Pizzimenti
 * @desc Return the desired property value if it exists; otherwise return null.
 * @param {string} arg The property to search for.
 * @this Args
 * @returns {object | undefined} Property value or throws an error and returns
 * nothing.
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
