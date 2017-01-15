/**
 * Created by apizzimenti on 1/1/17.
 */

/**
 * @module tools
 */

var Error = require("./Error").Error,
    
    chalk = require("chalk");

/**
 * @author Anthony Pizzimenti
 *
 * @desc Checks to see if a function parameter exists and typechecks it.
 *
 * @param param {*} Parameter to check.
 * @param type {*} The type the input parameter *should* be.
 *
 * @returns {boolean}
 */

function paramExist (param, type) {
    return (typeof(param) == type && param !== undefined && param !== null);
}

/**
 * @author Anthony Pizzimenti
 *
 * @desc A Location object used to group data from a call to the google geocode or geoip api.
 *
 * @param location {object} Object containing location data.
 *
 * @class Location
 *
 * @constructor
 *
 * @see tools~apply
 */

function Location (location) {
    
    if (paramExist(location, "object")) {
        apply(location, this);
    }
}

/**
 * @author Anthony Pizzimenti
 *
 * @desc A Weather object used to group data from a call to the DarkSky.net forecast api.
 *
 * @param w {object} Object containing weather data.
 *
 * @class Weather
 *
 * @constructor
 *
 * @see apply
 */

function Weather (w) {
    
    if (paramExist(w, "object")) {
        apply(w, this);
    }
}

/**
 * @author Anthony Pizzimenti
 *
 * @desc Maps top-level properties from one object to another.
 *
 * @param give {object} The object translating its properties.
 * @param receive {object} The object receiving the translated properties.
 */

function apply (give, receive) {
    
    for (var prop in give) {
        if (give.hasOwnProperty(prop)) {
            receive[prop] = give[prop];
        }
    }
}

/**
 * @author Anthony Pizzimenti
 *
 * @desc Transforms a UNIX timestring into a human-readable timestamp or datestamp.
 *
 * @param timestring {number | string} UNIX timestring; number of nanoseconds since the epoch.
 * @param includeDay {boolean} Should this function add the month and day to the timestamp?
 *
 * @returns {string}
 */

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
        
        day = date.getDate();
        
    }
    
    return (month ? month  + " " : "") + (day ? day + " " : "") + hours + ":" + minutes + suffix;
}

/**
 * @author Anthony Pizzimenti
 *
 * @desc Decides if the temperature is below zero and adjusts its color accordingly.
 *
 * @param temp {number} Temperature.
 * @param units {string} Celsius or Farenheit units of measurement.
 *
 * @returns {string}
 */

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

/**
 * @author Anthony Pizzimenti
 *
 * @desc Centers all tabular content. Ease-of-use method for using cli-table2.
 *
 * @param content {string | *} Content to be positioned in the table.
 *
 * @returns {{content: *, hAlign: string}}
 */

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
