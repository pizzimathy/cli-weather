/**
 * Created by apizzimenti on 1/2/17.
 */

var r = require("request"),
    p = require("../../../private.json"),
    
    tools = require("../../tools"),
    Error = tools.Error,
    status = tools.status,
    Weather = tools.Weather;

function weather (args, location, callback) {
    
    var lat = location.latitude,
        long = location.longitude,
        key = p.forecast_secret,
        url = "https://api.darksky.net/forecast/" + key + "/" + lat + "," + long + "?exclude=minutely,hourly,flags",
        
        msg = "The service couldn't retrieve the current weather for your location.",
        e = new Error(msg),
        
        w = {};
    
    if (args.get("celsius")) {
        url += "&units=si"
    }
    
    r(url, function (err, res, body) {
        
        if (err) {
            
            if (args.get("verbose")) {
                status("Couldn't get the weather for your location :/", false);
            }
            
            e.throw();
        }
        
        if (args.get("verbose")) {
            status("Here's the weather!", true);
        }
        
        w = new Weather(JSON.parse(body));
        callback(location, w, args);
    });
}

module.exports = {
    weather: weather
};
