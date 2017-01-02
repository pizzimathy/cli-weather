/**
 * Created by apizzimenti on 1/1/17.
 */

var paramExist = require("./Globals").paramExist,
    Error = require("./Error").Error,
    
    chalk = require("chalk"),
    ct = require("cli-table2"),
    emoji = require("node-emoji");

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
    this.daily = this.weather.daily.data.slice(1, this.weather.daily.data.length - 3);
    
    console.log(this.daily);
}

Output.prototype.header = function () {
    return chalk.underline("\nCurrent conditions for " + this.location.city + ", " + this.location.region_name + ":");
};

Output.prototype.current = function () {
    
    console.log(this.daily);
    
    var c = this.currently,
        summary = c.summary.toLowerCase(),
        feels = Math.round(c.apparentTemperature),
        temp = Math.round(c.temperature),
        wind = Math.round(c.windSpeed);
    
    return temp + "° • feels like " + feels + "° • " + wind + "mph wind • " + summary;
};

Output.prototype.days = function () {
    
    var _this = this;
    
    this.days = [];
    
    this.daily.forEach(function (day) {
        _this.days.push(new Date(day.time * 1000).toDateString());
    });
    
    return this.days;
};

Output.prototype.icons = function () {
    
    var _this = this;
    
    this.icons = [];
    
    this.daily.forEach(function (day) {
        
        var icon = day.icon;
        
        switch (icon) {
            
            case "clear-day":case "clear-night":
                _this.icons.push(emoji.get("sunny"));
                break;
                
            case "rain":
                _this.icons.push(emoji.get("rain_cloud"));
                break;
                
            case "snow":
                _this.icons.push(emoji.get("snowflake"));
                break;
                
            case "sleet":
                _this.icons.push(emoji.get("rain_cloud") + " + " + emoji.get("snowflake"));
                break;
                
            case "wind":
                _this.icons.push(emoji.get("tornado"));
                break;

            case "partly-cloudy-day":case "partly-cloudy-night":
                _this.icons.push(emoji.get("sun_small_cloud"));
                break;
                
            case "fog":default:
                _this.icons.push(emoji.get("cloud"));
                break;
        }
    });
    
    return this.icons;
};

Output.prototype.highs = function () {
    
    var _this = this;
    
    this.highs = [];
    
    this.daily.forEach(function (day) {
        _this.highs.push(Math.round(day.temperatureMax));
    });
    
    return this.highs;
};

Output.prototype.


module.exports = {
    Output: Output
};
