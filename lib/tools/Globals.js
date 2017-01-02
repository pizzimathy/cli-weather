/**
 * Created by apizzimenti on 1/1/17.
 */

exports.paramExist = function (param, type) {
    return (typeof(param) == type && param !== undefined && param !== null);
};

exports.argstring = function (argstring) {
    
    if (this.paramExist(argstring)) {
        this.argstring = argstring;
    }
};

exports.getArgstring = function () {
    return this.argstring;
};
