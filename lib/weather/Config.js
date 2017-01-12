/**
 * Created by apizzimenti on 1/2/17.
 */

/**
 * @module weather
 */

/**
 * @author Anthony Pizzimenti
 *
 * @desc Organizes and creates the Help object, Args object, checks if help is requested, and starts the chain of callbacks.
 *
 * @see Data
 * @see tools
 * @see Args
 * @see write
 * @see status
 * @see Help
 */

function config_weather () {
    
    var weather = require("./Data"),
        tools = require("../tools"),
        pkg = require("../../package.json"),
        
        min = require("minimist")(process.argv.slice(1)),
        chalk = require("chalk"),
        
        help = tools.Help,
        Args = tools.Args,
        write = tools.write,
        read = tools.read,
        status = tools.status,
        
        // creates a new Help object
        Help = new help(
            "cli-weather",
            "Retrieves weather for your current location or an input location.",
            pkg.version,
            {
                "celsius": "-c | --celsius → Change all units to si units (Celsius degrees/meters per second).",
                "canada": "--can → Change all units to Canadian units (Celsius degrees/kilometers per second).",
                "help": "-h | --help → Display this help page.",
                "address": "-a | --address → Retrieve the weather for the provided location.",
                "zip": "-z | --zip → Retrieve the weather for the provided zip code.",
                "verbose": "-v | --verbose → Show status messages while retrieving your weather.",
                "save": "-s | --save → Save the current options as defaults."
            }
        ),
        
        args,
        auto,
        
        // reads saved data from config file
        re = read(__dirname + "/config.json", min);
    
    // if the user wants to save the current argstring; otherwise override the saved one
    if (min.s || min.save) {
        min.s ? delete min.s : delete min.save;
        write(__dirname + "/config.json", min);
    } else {
        min = Object.assign(re, min);
    }
    
    // create new Args object for easy argstring reference
    args = new Args(min, {
        "address": ["a", "address"],
        "help": ["h", "help"],
        "celsius": ["c", "celsius"],
        "zip": ["z", "zip"],
        "verbose": ["v", "verbose"],
        "save": ["s", "save"],
        "can": ["can"]
    });
    
    // if there's a provided address or zip code, automatically retrieve location
    auto = !(args.get("address") || args.get("zip"));
    
    if (args.get("help")) {
        Help.display();
    }
    
    if (args.get("verbose")) {
        console.log();
        console.log(chalk.bold.underline("cli-weather v" + pkg.version));
        console.log();
    }
    
    if (auto) {
        weather.ip(args, weather.ip_location);
    } else if (!auto) {
        weather.p_location(args, weather.weather);
    }
}

module.exports = {
    config_weather: config_weather
};
