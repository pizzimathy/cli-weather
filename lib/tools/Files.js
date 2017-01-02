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
            e.message = "The file couldn't be written to - " + chalk.bgwhite.black("sudo") + " may be needed to" +
                " execute the save command.";
            e.throw();
        }
    
        status("The config file was written to successfully.", true);
    });
}

function read (file) {
    
    var f = paramExist(file, "string") ? file : __dirname + filename,
        data;
    
    if (fs.existsSync(file)) {
        
        data = fs.readFileSync(file, {encoding: "utf8"});
        
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
