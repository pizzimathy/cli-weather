/**
 * Created by apizzimenti on 1/1/17.
 */

var paramExist = require("./Globals").paramExist,
    Error = require("./Error").Error,
    
    chalk = require("chalk");

function Output (location, weather) {
    
    var e = new Error("");
    
    if (paramExist(location, "object")) {
        
        this.location = location;
        
    } else {
        
        e.message = "The location parameter does not exist.";
        e.throw();
        return;
    }
    
    
    if (paramExist(weather, "object")) {
        
        this.weather = weather;
        
    } else {
        
        e.message = "The weather parameter does not exist.";
        e.throw();
        return;
    }
    
    this.currently = this.weather.currently;
    this.daily = this.weather.daily.data;
}

Output.prototype.header = function () {
    return chalk.underline("\nCurrent conditions for " + this.location.city + ", " + this.location.region_name + ":");
};

Output.prototype.current = function () {
    
    var c = this.currently,
        summary = c.summary.toLowerCase(),
        feels = Math.round(c.apparentTemperature),
        temp = Math.round(c.temperature),
        wind = Math.round(c.windSpeed);
    
    return temp + "° • feels like " + feels + "° • " + wind + "mph wind • " + summary;
};

module.exports = {
    Output: Output
};
