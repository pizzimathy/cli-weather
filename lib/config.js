/**
 * Created by apizzimenti on 12/31/15.
 */

var args = require('./args'),
    clc = require('cli-color'),
    fs = require('fs'),
    parseArgs = require('minimist'),

    exec = require('child_process').exec,
    pathing = require('path');

var path = pathing.dirname(require.main.filename) + '/lib/config.json',
    help = require('./help');

function Config(units, ip) {
    this.args = parseArgs(process.argv.slice(2));
    this.units = units;
    this.ip = ip;
}

Config.prototype.sudo = function () {

    var that = this;

    if (that.args.s === true || that.args.save === true) {

        var args = ' weather ',
            arr = process.argv.slice(2);

        arr.forEach(function (arg) {
            args += arg + ' ';
        });

        that.control();
    } else {
        that.control();
    }
};

Config.prototype.control = function () {
    var keys = Object.keys(this.args).length - 1,
        args = this.args;

    if (keys === 0 || args.v) {
        read(this.args, this.units, this.ip);
    } else if (args.s || args.save) {
        write(this.args, this.units, this.ip);
    } else if (args.c || args.a !== null || args.address !== null) {
        handleArgs(this.args, this.units, this.ip);
    }
};

function write(args, units, ip) {

    console.log(clc.red('you may have to use ') + clc.bgBlack.white('sudo') +
        clc.red(' to save presets. a fix is on the way, don\'t worry.'));

    fs.writeFile(path, JSON.stringify(args, null, 2), function (err) {
        if (err) {
            console.log(clc.red('✗ couldn\'t save preset'));
            handleArgs(args, units, ip);
        } else {
            if (args.v || args.verbose) {
                console.log(clc.green('✓ saved preset'));
            }

            handleArgs(args, units, ip);
        }
    });

}

function read(args, units, ip) {

    if (args.c && !(args.s || args.save)) {
        handleArgs(args, units, ip);
    } else {

        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(clc.red('✗ couldn\'t read preset data: you have no presets! run the ') + clc.bgBlack.white(' -s ') +
                clc.red(' or the ') + clc.bgBlack.white('-save') + clc.red('\n option after any commands to save preferences'));
                handleArgs(args, units, ip);
            } else {
                if (args.v || args.verbose) {
                    console.log(clc.green('✓ read preset'));
                }

                handleArgs(JSON.parse(data), units, ip);
            }
        });
    }

}

function handleArgs(argv, units, ip) {

    help(argv);

    if (argv.c || argv.config) {
        units = {
            type: 'si',
            tmp: '˚C',
            speed: 'mps'
        };
    }

    if (argv.address || argv.a) {
        args.address(argv.address || argv.a, args.weatherRequest, units, argv);
    } else if (argv.lat && argv.long) {
        args.weatherRequest({lat: argv.lat, long: argv.long}, units, argv);
    } else {
        args.automatic(ip, args.weatherRequest, units, argv);
    }

}

function instance(units, ip) {
    return new Config(units, ip);
}

module.exports = instance;
