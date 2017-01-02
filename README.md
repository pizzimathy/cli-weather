[![NPM](https://nodei.co/npm/cli-weather.png?downloads=true)](https://nodei.co/npm/cli-weather/)

[![npm](https://img.shields.io/npm/dt/cli-weather.svg?style=flat-square)]()
[![GitHub release](https://img.shields.io/github/release/apizzimenti/cli-weather.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/l/cli-weather.svg?style=flat-square)]()
[![GitHub issues](https://img.shields.io/github/issues/apizzimenti/cli-weather.svg?style=flat-square)]()
[![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/apizzimenti/cli-weather.svg?style=flat-square)]()

**cli-weather** allows you to check the weather without taking a step outside your development environment. Instant,
accurate location-based current conditions + four-day forecast.

### Updates
**cli-weather** has received a bit of a facelift! More colors have been added, different symbols, and a better packaging
system have been implemented. This project is going to be expanded in the near future (hint hint), so there's always room
for added features.

### Contributing
Contribute as much as you want! Just open up a pull request and we can look it over together. And, as always, feedback is
appreciated.

### Usage

`$ weather [options]`

__Options__
- `-c | --celsius` &rarr; All units are changed to si (Celsius degrees, meters/second windspeed)
- `-z | --zip` &rarr; Provide a zip code to retrieve weather from.
- `-a | --address` &rarr; Provide a city name, zip code, partial city name, city/state combo, and it'll try to get weather from there.
- `-v | --verbose` &rarr; Displays status updates while going through the process of retrieving weather.
- `-s | --save` &rarr; Saves the current options passed into the command line; these options will be the default settings unless overwritten.
- `-h | --help` &rarr; Show help. This cannot be saved as a default option.

