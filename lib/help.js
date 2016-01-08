/**
 * Created by apizzimenti on 1/6/16.
 */

var clc = require('cli-color'),
  pkg = require('../package.json'),
  col = clc.bgBlack.white;

'use strict';

function help(args) {

  var help =
    '\ncli-weather, version ' + col(pkg.version) + '\n' +
    '--------------------------\n' +
    'available commands:\n' +
      '\t ' + col('-a, --address') + '\tpass address\n' +
      '\t ' + col('-s, --save') + '\tsave preset(s)\n' +
      '\t ' + col('--long') + '\t\tpass longitude (requires ' + col('--lat') + ')\n' +
      '\t ' + col('--lat') + '\t\tpass latitude (requires ' + col('--long') + ')\n' +
      '\t ' + col('-c, --config') + '\tuse metric' + '\n' +
      '\t ' + col('-h, --help') + '\tdisplay this help text' + '\n';

  if (args.h || args.help) {
    return help;
  }
}

module.exports = help;