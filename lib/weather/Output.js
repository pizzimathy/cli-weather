/**
 * Created by apizzimenti on 1/1/17.
 */

/**
 * @module weather
 */

var paramExist = require("./../tools/Globals").paramExist,
    Error = require("./../tools/Error").Error,
    realTime = require("./../tools/Globals").realTime,
    hotCold = require("./../tools/Globals").hotCold,
    tc = require("./../tools/Globals").tableContent,
    
    wrap = require("wordwrap")(4, process.stdout.columns),
    chalk = require("chalk"),
    Table = require("cli-table2");

/**
 * @author Anthony Pizzimenti
 *
 * @desc Object dedicated to collecting, organizing, and printing data.
 *
 * @param location {Location} Location object.
 * @param weather {Weather} Weather object.
 * @param args {Args} Args object.
 *
 * @property location {Location}
 * @property weather {Weather}
 * @property args {Args}
 * @property alerts {object[]} NOAA alerts for the given location.
 * @property currently {object} Current weather report.
 * @property daily {object[]} Weather reports for today through three days from now.
 *
 * @class Object
 *
 * @see Weather
 * @see Location
 * @see Args
 * @see prettyprint
 *
 * @constructor
 */

function Output (location, weather, args) {
    
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
    
    if (paramExist(args, "object")) {
        this.args = args;
    } else {
        e.message = "The args parameter does not exist.";
        e.throw();
        return;
    }
    
    this.alerts = this.weather.alerts ? this.weather.alerts : [];
    this.currently = this.weather.currently;
    this.daily = this.weather.daily.data.slice(0, this.weather.daily.data.length - 4);
}

/**
 * @author Anthony Pizzimenti
 * @desc Prints out the header containing the city/county and region information.
 */

Output.prototype.header = function () {
    
    var city = this.location.city,
        state = this.location.region_name;
    
    console.log(chalk.underline("\nCurrent conditions for " + city + ", " + state + ":"));
};

/**
 * @author Anthony Pizzimenti
 * @desc Prints the current conditions in the city/county.
 *
 * @see hotCold
 * @see Args
 */

Output.prototype.current = function () {
    
    var c = this.currently,
        summary = c.summary.toLowerCase(),
        feels = hotCold(Math.round(c.apparentTemperature), this.args.get("celsius")),
        temp = hotCold(Math.round(c.temperature), this.args.get("celsius")),
        wind = Math.round(c.windSpeed),
        wind_unit = this.args.get("celsius") ? " mps " : " mph ";
    
    console.log(temp + "° • feels like " + feels + "° • " + wind + wind_unit + "wind • " + summary + "\n");
};

/**
 * @author Anthony Pizzimenti
 * @desc Collects information from each day's weather report's icon property, which contains a short description of the
 * weather conditions for the day.
 *
 * @see tableContent
 */

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
    
    for (var i = 0; i < this.icons.length; i++) {
        this.icons[i] = tc(this.icons[i]);
    }
};

Output.prototype.data = function () {
    
    var _this = this,
        temps = "";
    
    this.days = [];
    this.temps = [];
    this.precip = [];
    this.sunrise = [];
    this.sunset = [];
    
    this.daily.forEach(function (day) {
        
        _this.days.push(tc(new Date(day.time * 1000).toDateString()));
        
        temps = chalk.bold(hotCold(Math.round(day.temperatureMax), _this.args.get("celsius"))) + "° " + chalk.dim(hotCold(Math.round(day.temperatureMin), _this.args.get("celsius"))) + "°";
        _this.temps.push(tc(temps));
        
        _this.precip.push(tc(Math.round(day.precipProbability * 100, 2) + "% chance precip"));
        _this.sunrise.push(tc(chalk.yellow("☀") + " " + realTime(day.sunriseTime)));
        _this.sunset.push(tc(chalk.blue("☾") + " " + realTime(day.sunsetTime)));
    });
};

/**
 * @author Anthony Pizzimenti
 * @desc Collects the current NOAA alerts for the city or region and prints them.
 */

Output.prototype.warnings = function () {
    
    var warnstring = {},
        warn = {},
        color = "";
    
    if (this.alerts.length != 0) {
        
        console.log();
    
        for (var i = 0; i < this.alerts.length; i++) {
    
            warn = this.alerts[i];
            color = this._assignWarningColor(warn.title);
    
            warnstring.title = chalk.bold("Alert: " + warn.title);
            warnstring.title +=  chalk.bold(" active from " + realTime(warn.time, true) + " to " + realTime(warn.expires, true));
            warnstring.title = chalk[color](warnstring.title);
            
            // if verbose is passed, print out the full text of each alert.
            if (this.args.get("verbose")) {
                warnstring.title = chalk.underline(warnstring.title);
                warnstring.description = wrap(chalk.white("\n" + warn.description));
            }
    
            for (var prop in warnstring) {
                if (warnstring.hasOwnProperty(prop)) {
                    console.log(warnstring[prop]);
                }
            }
        }
    
        // this is meant to ensure the safety of this app's users.
        console.log(chalk.bgRed("Please visit " + chalk.bold("alerts.weather.gov") + " for more information."));
        console.log();
    }
};

/**
 * @author Anthony Pizzimenti
 *
 * @desc Picks out the words "Warning", "Watch", "Statement", or "Emergency" from the title and assigns a color based on
 * its severity.
 *
 * @param title {string} Title of the alert.
 *
 * @returns {string}
 *
 * @see Output#warnings
 *
 * @private
 */

Output.prototype._assignWarningColor = function (title) {
    
    if (title.includes("Warning")) {
        return "red";
    } else if (title.includes("Watch")) {
        return "yellow"
    } else if (title.includes("Statement")) {
        return "green";
    } else if (title.includes("Emergency")) {
        return "bgYellow";
    } else {
        return "white";
    }
};

/**
 * @author Anthony Pizzimenti
 * @desc Calls all the preceding functions to generate the current and tabulated weather.
 *
 * @see header
 * @see current
 * @see icons
 * @see data
 * @see warnings
 * @see prettyprint
 */

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
                    head: ["bold"],
                    align: ["center"]
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
    this.warnings();
    // credit to DarkSky.net; if I hadn't seen a reddit thread with this api in it last year, this project wouldn't exist
    console.log(chalk.dim("Powered by DarkSky.net"));
    console.log();
    
    process.exit(0);
};


module.exports = {
    Output: Output
};
