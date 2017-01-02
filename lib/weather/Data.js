/**
 * Created by apizzimenti on 1/1/17.
 */

var r = require("request"),
    tools = require("../tools"),
    p = require("../../private.json"),
    Output = require("./Output").Output,
    
    status = tools.status,
    Error = tools.Error,
    Location = tools.Location,
    Weather = tools.Weather,
    
    geocoder = require("geocoder");

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
        state,
        json = {};
    
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

function prettyprint (location, weather, args) {
    
    var o = new Output(location, weather, args);
    o.print();
}

module.exports = {
    ip: ip,
    ip_location: ip_location,
    p_location: p_location,
    weather: weather
};
