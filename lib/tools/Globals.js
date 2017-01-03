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

function realTime (timestring, includeDay) {
    
    var date = new Date(timestring * 1000),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        month = null,
        day = null,
        suffix = "";
    
    suffix = hours > 12 ? "pm" : "am";
    hours = hours > 12 ? hours - 12 : hours;
    minutes = minutes > 10 ? minutes : "0" + minutes;
    
    if (includeDay) {
        
        switch(date.getMonth()) {
            
            case 0:
                month = "January";
                break;
                
            case 1:
                month = "February";
                break;
                
            case 2:
                month = "March";
                break;
                
            case 3:
                month = "April";
                break;
                
            case 4:
                month = "May";
                break;
                
            case 5:
                month = "June";
                break;
                
            case 6:
                month = "July";
                break;
                
            case 7:
                month = "August";
                break;
            
            case 8:
                month = "September";
                break;
                
            case 9:
                month = "October";
                break;
                
            case 10:
                month = "November";
                break;
                
            case 11:
                month = "December";
                break;
        }
        
        day = date.getDay();
        
    }
    
    return (month ? month  + " " : "") + (day ? day + " " : "") + hours + ":" + minutes + suffix;
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
