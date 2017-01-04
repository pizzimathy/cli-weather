/**
 * Created by apizzimenti on 1/2/17.
 */

/**
 * @module Data
 */

var Output = require("../Output").Output;

/**
 * @author Anthony Pizzimenti
 *
 * @desc Last callback in the chain; creates an Output object which organizes the data and prints it.
 *
 * @param location {Location} Location object.
 * @param weather {Weather} Weather object.
 * @param args {Args} Args object.
 *
 * @see Args
 * @see Weather
 * @see Location
 * @see config_weather
 * @see Output
 */

function prettyprint (location, weather, args) {
    
    var o = new Output(location, weather, args);
    o.print();
}

module.exports = {
    prettyprint: prettyprint
};
