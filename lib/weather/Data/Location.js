/**
 * Created by apizzimenti on 1/2/17.
 */

var r = require("request"),
    geocoder = require("geocoder"),
    
    tools = require("../../tools"),
    status = tools.status,
    Error = tools.Error,
    Location = tools.Location,
    
    prettyprint = require("./Prettyprint").prettyprint;

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

function p_location (args, callback) {
    
    var msg = "The location service couldn't find the lat/long attached to the provided address.",
        e = new Error(msg),
        
        lat = 0,
        long = 0,
        city,
        state;
    
    geocoder.geocode(args.get("address") || args.get("zip"), function (err, data) {
        
        if (err) {
            
            if (args.get("verbose")) {
                status("Google geocoding couldn't find the location.", false);
            }
            
            e.throw();
        }
        
        if (args.get("verbose")) {
            status("Found your location.", true);
        }
        
        city = data.results[0].address_components[0].short_name;
        state = data.results[0].address_components[2].long_name;
        
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
