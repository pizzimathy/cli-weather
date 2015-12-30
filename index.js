#! /usr/bin/env node

/**
 * Created by apizzimenti on 12/27/15.
 */

// dependencies

var http = require('http'),
    https = require('https'),
    publicIp = require('public-ip'),
    clc = require('cli-color'),
    parseArgs = require('minimist'),
    Format = require('./lib/Format'),
    args = require('./lib/args'),
    fs = require('fs');

var ip = '',
    units = {
        type: 'us',
        tmp: '˚F',
        speed: 'mph'
    };

// gets public ip address
publicIp(function (err, res) {

    if (err) {
        console.log(clc.red('˟ couldn\'t find public ip address'));
    } else if (res) {
        ip = res;
        console.log(clc.green('✓ got ip address'));
    }
});

var argv = parseArgs(process.argv.slice(2), opts={});

if (argv.save === true || argv.s === true){
  // we want to save this configuration to use again later
  fs.writeFile('./config.json', JSON.stringify(argv), function (err) {
    if (err) {
      console.log(clc.red('˟ something went wrong [' + JSON.stringify(err) + ']'));
    }
    console.log(clc.green('✓ saved data as a preset'));
  });
}

if (argv._.length === 0){
  // if we're not passing any arguments, check to see if we have a config file
  fs.readFile('./config.json', function (err, data) {
    // if we do, load it
    if (err) {
      console.log(clc.red('˟ no config file found'));
    }else{
      console.log(clc.green('✓ read config.json in as arguments'));
      argv = JSON.parse(data);
    }
    handleArgs();
  });
}

function handleArgs(){
  if (argv.c) {
      units = {
          type: 'si',
          tmp: '˚C',
          speed: 'mps'
      };
  }

  if (address = argv.address || argv.a) {
      args.address(address, args.weatherRequest, units);

  } else if (argv.lat && argv.long) {
      args.weatherRequest({lat: argv.lat, long: argv.long}, units);

  } else {
      args.automatic(ip, args.weatherRequest, units);

  }
}
