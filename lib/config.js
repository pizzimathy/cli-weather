/**
 * Created by apizzimenti on 12/31/15.
 */


var args = require('./args'),
    clc = require('cli-color'),
    fs = require('fs'),
    parseArgs = require('minimist'),
    pathing = require('path');

var path = pathing.dirname(require.main.filename) + '/lib/config.json';

function Config(units, ip) {
    this.args = parseArgs(process.argv.slice(2));
    this.units = units;
    this.ip = ip;
}

Config.prototype.control = function () {

    if (this.args.save === true || this.args.s === true) {
        write(this.args, this.units, this.ip);
    } else if (!this.args.save || !this.args.s) {
        read(this.args, this.units, this.ip);
    } else {
        handleArgs(this.args, this.units, this.ip);
    }

};

function write(args, units, ip) {

    fs.writeFile(path, JSON.stringify(args), function (err) {
        if (err) {
            console.log(clc.red('✗ couldn\'t save preset'));
            handleArgs(args, units, ip);
        } else {
            console.log(clc.green('✓ saved preset'));
            handleArgs(args, units, ip);
        }
    });

}

function read(args, units, ip) {

    fs.readFile(path, function (err, data) {
        if (err) {
            console.log(clc.red('✗ couldn\'t read preset data: you have no presets! run the ') + clc.bgBlack.white(' -s ' )
            + clc.red(' or the ') + clc.bgBlack.white('-save') + clc.red(' option after any commands to save preferences'));

            handleArgs(args, units, ip);
        } else {
            console.log(clc.green('✓ got preset data'));
            handleArgs(JSON.parse(data), units, ip);
        }
    });

}

function handleArgs(argv, units, ip) {

    if (argv.c) {
        units = {
            type: 'si',
            tmp: '˚C',
            speed: 'mps'
        }
    }

    if (argv.address || argv.a) {
        args.address(address, args.weatherRequest, units);
    } else if (argv.lat && argv.long) {
        args.weatherRequest({lat: argv.lat, long: argv.long}, units);
    } else {
        args.automatic(ip, args.weatherRequest, units);
    }

}

function instance(argv, units, ip) {
    return new Config(argv, units, ip);
}

module.exports = instance;