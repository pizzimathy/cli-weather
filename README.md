# cli-weather

[![NPM](https://nodei.co/npm/cli-weather.png?compact=true)](https://nodei.co/npm/cli-weather/)

![license](https://img.shields.io/badge/license-MIT-blue.svg)
[![npm](https://img.shields.io/npm/v/npm.svg)]()


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

If you always want to see weather for a particular area or with celsius instead of fahrenheit, pass `--save`  or `-s` along with your preferred values, and the next time you run `weather` without any arguments, it will get those values and give you weather for them.

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
