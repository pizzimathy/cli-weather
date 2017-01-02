/**
 * Created by apizzimenti on 1/1/17.
 */

var emoji = require("node-emoji");

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

function realTime (timestring) {
    
    var date = new Date(timestring),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        suffix = "";
    
    hours = hours > 12 ? hours - 12 : hours;
    suffix = hours > 12 ? "pm" : "am";
    minutes = minutes > 10 ? minutes : "0" + minutes;
    
    return hours + ":" + minutes + suffix;
}


module.exports = {
    paramExist: paramExist,
    argstring: argstring,
    Location: Location,
    Weather: Weather,
    realTime: realTime
};
