/**
 * Created by apizzimenti on 1/1/17.
 */

var Error = require("./Error").Error,
    
    chalk = require("chalk");

function paramExist (param, type) {
    return (typeof(param) == type && param !== undefined && param !== null);
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
    
    var date = new Date(timestring * 1000),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        suffix = "";
    
    suffix = hours > 12 ? "pm" : "am";
    hours = hours > 12 ? hours - 12 : hours;
    minutes = minutes > 10 ? minutes : "0" + minutes;
    
    return hours + ":" + minutes + suffix;
}

function hotCold (temp, units) {
    
    var t,
        e = new Error();
    
    if (paramExist(temp, "number")) {
        t = units ? 0 : 32;
        return (temp > t ? chalk.red(temp) : chalk.blue(temp));
    }
    
    e.message = "The temperature parameter does not exist.";
    e.throw();
}

function tableContent (content) {
    
    return {
        content: content,
        hAlign: "center"
    };
}


module.exports = {
    paramExist: paramExist,
    Location: Location,
    Weather: Weather,
    realTime: realTime,
    hotCold: hotCold,
    tableContent: tableContent
};
