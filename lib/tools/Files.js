/**
 * Created by apizzimenti on 1/2/17.
 */

var fs = require("fs"),
    chalk = require("chalk"),
    
    Error = require("./Error").Error,
    paramExist = require("./Globals").paramExist,
    status = require("./Status").status,
    
    filename = "/config.json";

function write (file, data) {
    
    var f = paramExist(file, "string") ? file : __dirname + filename,
        d = paramExist(data, "object") ? JSON.stringify(data) : "{}",
        e = new Error();

    fs.writeFile(f, d, function (err) {
    
        if (err) {
            e.message = f + " couldn't be written to - " + chalk.bgWhite.black("sudo") + " may be needed to" +
                " execute the save command, but " + chalk.bgWhite.black("sudo") + " must be run each time presets are" +
                " saved. You can also run\n\n" + chalk.black.bold("\t sudo chmod 744 " + __dirname.split("/").slice(0, -2).join("/") + "/")
                + "\n\nto change the write permissions in the directory where cli-weather is stored.";
            e.throw();
        }
    
        status(f + " was written to successfully.", true);
    });
}

function read (file, args) {
    
    var f = paramExist(file, "string") ? file : __dirname + filename,
        data;
    
    if (fs.existsSync(f)) {
        
        data = fs.readFileSync(f, {encoding: "utf8"});
        
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
