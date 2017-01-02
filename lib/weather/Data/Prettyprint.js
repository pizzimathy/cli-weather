/**
 * Created by apizzimenti on 1/2/17.
 */

var Output = require("../Output").Output;

function prettyprint (location, weather, args) {
    
    var o = new Output(location, weather, args);
    o.print();
}

module.exports = {
    prettyprint: prettyprint
};
