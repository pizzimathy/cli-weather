/**
 * Created by apizzimenti on 1/1/17.
 */

var paramExist = require("./Globals").paramExist,
    Error = require("./Error").Error,
    realTime = require("./Globals").realTime,
    
    chalk = require("chalk"),
    Table = require("cli-table");

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
}

Output.prototype.header = function () {
    console.log(chalk.underline("\nCurrent conditions for " + this.location.city + ", " + this.location.region_name + ":"));
};

Output.prototype.current = function () {
    
    var c = this.currently,
        summary = c.summary.toLowerCase(),
        feels = Math.round(c.apparentTemperature),
        temp = Math.round(c.temperature),
        wind = Math.round(c.windSpeed);
    
    console.log(temp + "° • feels like " + feels + "° • " + wind + "mph wind • " + summary + "\n");
};

Output.prototype.icons = function () {
    
    var _this = this;
    
    this.icons = [];
    
    this.daily.forEach(function (day) {
        
        var icon = day.icon;
        
        switch (icon) {
            case "clear-day":case "clear-night":
                _this.icons.push("☀ clear");
                break;
                
            case "rain":
                _this.icons.push("☂ rain");
                break;
                
            case "snow":
                _this.icons.push("❄ snow");
                break;
                
            case "sleet":
                _this.icons.push("☂❄ sleet");
                break;
                
            case "wind":
                _this.icons.push("➳ wind");
                break;
                
            case "fog":
                _this.icons.push("☁ fog");
                break;
                
            case "partly-cloudy-day":case "partly-cloudy-night":
                _this.icons.push("☁☀ partly cloudy");
                break;
                
            default:
                _this.icons.push("☁ clouds");
                break;
        }
    });
};

Output.prototype.data = function () {
    
    var _this = this;
    
    this.days = [];
    this.temps = [];
    this.precip = [];
    this.sunrise = [];
    this.sunset = [];
    
    this.daily.forEach(function (day) {
        _this.days.push(new Date(day.time * 1000).toDateString());
        _this.temps.push(chalk.bold(Math.round(day.temperatureMax)) + "° " + chalk.dim(Math.round(day.temperatureMin)) + "°");
        _this.precip.push(Math.round(day.precipProbability * 100, 2) + "% precip.");
        _this.sunrise.push("☀ " + realTime(day.sunriseTime));
        _this.sunset.push("☾ " + realTime(day.sunsetTime));
    });
};

Output.prototype.print = function () {
    
    this.header();
    this.current();
    
    this.icons();
    this.data();
    
    var _this = this,
        table = new Table(
            {
                colWidths: [20, 20, 20, 20],
                head: this.days,
                chars: {
                    'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''
                },
                style: {
                    head: ["bold"]
                }
            }
        );
    
    table.push(
        _this.temps,
        _this.icons,
        _this.precip,
        _this.sunrise,
        _this.sunset
    );
    
    console.log(table.toString());
};


module.exports = {
    Output: Output
};
