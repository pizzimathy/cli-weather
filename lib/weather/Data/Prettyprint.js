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
 * @param {Location} location Location object.
 * @param {Weather} weather Weather object.
 * @param {Args} args Args object.
 *
 * @see Args
 * @see Weather
 * @see Location
 * @see config_weather
 * @see Output
 *
 * @returns {undefined}
 */
function prettyprint (location, weather, args) {
    
    var o = new Output(location, weather, args);
    o.print();
}

module.exports = {
    prettyprint: prettyprint
};
