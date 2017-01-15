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
        dir = __dirname + "/config.json",
        
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
                "save": "-s | --save → Save the current options as defaults.",
                "clear": "--clear → Clear the current default options.",
                "key": "-k | --key → Use your own DarkSky api key which will be used for all requests.",
                "clearkey": "--clearkey → Clear the saved DarkSky api key."
            }
        ),
        
        args,
        auto,
        
        // reads saved data from config file
        re = read(dir, min);
        
    if (min.s || min.save) {
        
        min.s ? delete min.s : delete min.save;
        re.args = min;

        if (min.k || min.key) {
            re.key = min.k ? min.k : min.key;
            re.args.key ? delete re.args.key : delete re.args.k;
        }
        
        write(dir, re);
        
    } else if (min.clear) {
        re.args = {};
        write(dir, re);
    } else if (min.clearkey) {
        re.key = {};
        write(dir, re);
    }
    
    min = Object.assign(re.args || {}, min);
    min.key = re.key;
    
    // create new Args object for easy argstring reference
    args = new Args(min, {
        "address": ["a", "address"],
        "help": ["h", "help"],
        "celsius": ["c", "celsius"],
        "zip": ["z", "zip"],
        "verbose": ["v", "verbose"],
        "save": ["s", "save"],
        "canada": ["can"],
        "clear": ["clear"],
        "key": ["k", "key"],
        "clearkey": ["clearkey"]
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
        
        for (var prop in args.flattened) {
            if (prop != "key") {
                console.log(`${prop} = ${typeof(args.get(prop)) === "string" ? args.get(prop) : "true"}`);
            }
        }
        
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
