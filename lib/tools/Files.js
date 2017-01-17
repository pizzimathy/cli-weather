/**
 * Created by apizzimenti on 1/2/17.
 */

/**
 * @module tools
 */

var fs = require("fs"),
    chalk = require("chalk"),
    
    Error = require("./Error").Error,
    paramExist = require("./Globals").paramExist,
    status = require("./Status").status,
    
    filename = "/config.json";


/**
 * @author Anthony Pizzimenti
 *
 * @desc Writes data to the config file; if the file exists but does not have proper permissions, an error is thrown.
 *
 * @function write
 *
 * @param {string} [file=__dirname + "/config.json"] Filepath to be written to.
 * @param {string} [data="{}"] Data to write to the file.
 *
 * @throws Error
 *
 * @returns {undefined}
 */
function write (file, data) {
    
    var f = paramExist(file, "string") ? file : __dirname + filename,
        d = paramExist(data, "object") ? JSON.stringify(data) : "{}",
        e = new Error();

    fs.writeFile(f, d, function (err) {
    
        if (err) {
            e.message = f + " couldn't be written to - " + chalk.bgWhite.black("sudo") + " may be needed to" +
                " execute the save command, but " + chalk.bgWhite.black("sudo") + " must be run each time presets are" +
                " saved. You can also run\n\n" + chalk.black.bold("\t sudo chmod 747 " + __dirname.split("/").slice(0, -2).join("/") + "/")
                + "\n\nto change the read/write/execute permissions in the directory where cli-weather is stored.";
            e.throw();
        }
    
        status(f + " was written to successfully.", true);
    });
}


/**
 * @author Anthony Pizzimenti
 *
 * @desc Async reads from a file; if no data is present, it returns an empty object; if the file doesn't exist, it returns
 * null.
 *
 * @param {string} [file=__dirname + "/config.json"] Filepath to read from.
 *
 * @see Args
 *
 * @returns {object | null} Data read from file as JSON or an empty object.
 */
function read (file) {
    
    var f = paramExist(file, "string") ? file : __dirname + filename,
        data;
    
    if (fs.existsSync(f)) {
        
        data = fs.readFileSync(f, { encoding: "utf8" });
        
        if (data) {
            return JSON.parse(data);
        } else {
            return {};
        }
        
    } else {
        return null;
    }
}

module.exports = {
    write: write,
    read: read
};
