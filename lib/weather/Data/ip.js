/**
 * Created by apizzimenti on 1/2/17.
 */

var r = require("request"),
    
    tools = require("../../tools/index"),
    status = tools.status,
    Error = tools.Error,
    
    weather = require("./Weather").weather;
    
    

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
