/**
 * Created by apizzimenti on 1/6/16.
 */

var clc = require('cli-color'),
  pkg = require('../package.json'),
  col = clc.bgBlack.white;

function help(args) {

  var belp =
    '\ncli-weather, version ' + col(pkg.version) + '\n' +
    '--------------------------\n' +
    'available commands:\n' +
      '\t ' + col('-a, --address') + '\tpass address\n' +
      '\t ' + col('-s, --save') + '\tsave preset(s)\n' +
      '\t ' + col('--long') + '\t\tpass longitude (requires ' + col('--lat') + ')\n' +
      '\t ' + col('--lat') + '\t\tpass latitude (requires ' + col('--long') + ')\n' +
      '\t ' + col('-c, --config') + '\tuse metric' + '\n' +
      '\t ' + col('-h, --help') + '\tdisplay this help text' + '\n' +
      '\t ' + col('-v, --verbose') + '\tverbose';

  if (args.h || args.help) {
      console.log(belp);
      process.exit(0);
  }
}

module.exports = help;