/**
 * Created by apizzimenti on 1/2/17.
 */

/**
 * @module Data
 */

var r = require("request"),
    
    tools = require("../../tools/index"),
    status = tools.status,
    Error = tools.Error,
    
    weather = require("./Weather").weather;

/**
 * @author Anthony Pizzimenti
 *
 * @desc Retrieves the computer's public ip address. May not be accurate if the isp is bad (looking at you, Mediacom).
 *
 * @param {Args} args Args object.
 * @param {function} callback Function must take an Args object, the body of the request. This callback's third parameter
 * is the weather function.
 *
 * @throws Error
 *
 * @see Args
 * @see weather
 * @see ip_location
 * @see config_weather
 *
 * @returns {undefined}
 */
function ip (args, callback) {
    
    var msg = "Either your computer is not connected to the internet properly or the service couldn't" +
            " find your external ip address.",
        e = new Error(msg);
    
    r("http://api.ipify.org", function (err, res, body) {
        
        if (err) {
            
            if (args.get("verbose")) {
                status("Couldn't retrieve public ip.", false);
            }
            
            e.throw();
        }
        
        if (args.get("verbose")) {
            status("Got public ip.", true);
        }
        
        callback(args, body, weather);
    });
}

module.exports = {
    ip: ip
};
