/**
 * Created by apizzimenti on 1/1/17.
 */

function paramExist (param, type) {
    return (typeof(param) == type && param !== undefined && param !== null);
}

function argstring (argstring) {
    
    if (paramExist(argstring)) {
        this.argstring = argstring;
    }
}

function Location (location) {
    
    if (paramExist(location, "object")) {
        apply(location, this);
    }
}

function Weather (w) {
    
    if (paramExist(w, "object")) {
        apply(w, this);
    }
}

function apply (give, receive) {
    
    for (var prop in give) {
        if (give.hasOwnProperty(prop)) {
            receive[prop] = give[prop];
        }
    }
}

module.exports = {
    paramExist: paramExist,
    argstring: argstring,
    Location: Location,
    Weather: Weather
};
