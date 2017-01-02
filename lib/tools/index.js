/**
 * Created by apizzimenti on 1/1/17.
 */

var e = require("./Error"),
    h = require("./Globals");

module.exports = {
    Error: e.Error,
    paramExist: h.paramExist,
    location: h.location,
    getLocation: h.getLocation,
    argstring: h.argstring,
    getArgstring: h.getArgstring
};
