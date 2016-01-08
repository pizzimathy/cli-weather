# cli-weather

[![NPM](https://nodei.co/npm/cli-weather.png?compact=true)](https://nodei.co/npm/cli-weather/)

[![npm](https://img.shields.io/npm/l/cli-weather.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)]()
[![node](https://img.shields.io/node/v/gh-badges.svg?style=flat-square)]()
[![Build status](https://img.shields.io/travis/apizzimenti/cli-weather.svg?style=flat-square)](https://travis-ci.org/apizzimenti/cli-weather)
[![npm](https://img.shields.io/npm/dt/cli-weather.svg?style=flat-square)]()
[![GitHub issues](https://img.shields.io/github/issues/apizzimenti/cli-weather.svg?style=flat-square)]()
[![Github All Releases](https://img.shields.io/github/downloads/apizzimenti/cli-weather/total.svg?style=flat-square)]()


A simple client to get weather in your terminal. Working on a project but need to run across the street to Jimmy John's
to get your food? Instead of looking up the weather online, just run `weather` from your terminal and get instant,
accurate location-based weather (current and 4-day forecast!).

#### installation

`$ npm install cli-weather -g`

#### usage

`$ weather`  
`$ weather -a "Atlanta, GA"`  
`$ weather --address="Atlanta, GA"`  
`$ weather --lat=34.1036 --long=-84.6374`  

#### units

Use the -c option flag to specify metric units (celsius for temp and meters per second for windspeed)

`$ weather -c`  

#### configuration

If you always want to see weather for a particular area or with celsius instead of fahrenheit, pass `--save`  or `-s` 
along with your preferred values, and the next time you run `weather` without any arguments, it will get those values 
and give you weather for them.

#### sample output
**Fahrenheit**

![Sample output in F](https://dl.dropbox.com/s/rh7okhbozy5bf4v/f.png?dl=0)

**Celsius**

![Sample output in C](https://dl.dropbox.com/s/51fc6imsxnj5v2k/c.png?dl=0)

**Saving**

![Sample save output](https://dl.dropbox.com/s/u2li8lrkn5f05hy/s.png?dl=0)

**Custom Location**

![Sample custom location output](https://dl.dropbox.com/s/u7s65uxwe0c37gf/a.png?dl=0);

#### api

coming soon...

The cli-weather api will allow you to `require()` cli-weather in your apps/sites and get all the data and formatting that
powers this module.