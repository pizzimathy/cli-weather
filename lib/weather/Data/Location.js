/**
 * Created by apizzimenti on 1/2/17.
 */

/**
 * @module Data
 */

var r = require("request"),
    geocoder = require("geocoder"),
    
    tools = require("../../tools"),
    status = tools.status,
    Error = tools.Error,
    Location = tools.Location,
    
    prettyprint = require("./Prettyprint").prettyprint;

/**
 * @author Anthony Pizzimenti
 *
 * @desc Gets the computer's location based on a public ip address.
 *
 * @param {Args} args Args object.
 * @param {string} ip Public ip address of this computer.
 * @param {function} callback First parameter is the Args object, the second is the retrieved location. The third is the
 * prettyprint function.
 *
 * @throws Error
 *
 * @see Args
 * @see weather
 * @see prettyprint
 * @see config_weather
 *
 * @returns {undefined}
 */
function ip_location (args, ip, callback) {
    
    var msg = "The location service couldn't find where you are by your public ip.",
        e = new Error(msg),
        loc = {};
    
    r("http://freegeoip.net/json/" + ip, function (err, res, body) {
        
        if (err) {
            
            if (args.get("verbose")) {
                status("Couldn't locate wherever you are.", false);
            }
            
            e.throw();
        }
        
        if (args.get("verbose")) {
            status("Found your location.", true);
        }
        
        loc = new Location(JSON.parse(body));
        callback(args, loc, prettyprint);
    });
}

/**
 * @author Anthony Pizzimenti
 *
 * @desc Gets the geocode location based on the provided address or zip code.
 *
 * @param {Args} args Args object.
 * @param {function} callback In practice, this is the weather function. First parameter is the Args object, second
 * parameter is regional data. The data *must* contain the four parameters used in this example for the weather function to be
 * able to retrieve data. Third is the prettyprint function.
 *
 * @throws Error
 *
 * @see Args
 * @see weather
 * @see prettyprint
 * @see config_weather
 *
 * @returns {undefined}
 */
function p_location (args, callback) {
    
    var e = new Error(),
        
        city,
        state;
    
    geocoder.geocode(args.get("address") || args.get("zip"), function (err, data) {
        
        if (err) {
            
            if (args.get("verbose")) {
                status("Google geocoding couldn't find the location.", false);
            }
            
            e.message = "The google geocoder service couldn't find a location related to the one provided.";
            e.throw();
        }
        
        // geocoder will return a request, but the results array will be empty as per the JSON spec.
        if (data.results[0]) {
            city = data.results[0].address_components[0].short_name;
            state = data.results[0].address_components[2].long_name;
        } else {
            e.message = "No location parameter was provided.";
            e.throw();
        }
        
        if (args.get("verbose")) {
            status("Found your location.", true);
        }
        
        callback(args, {
            city: city,
            region_name: state,
            latitude: data.results[0].geometry.location.lat,
            longitude: data.results[0].geometry.location.lng
        }, prettyprint);
    });
}

module.exports = {
    ip_location: ip_location,
    p_location: p_location
};
