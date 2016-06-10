/**
 * Created by apizzimenti on 6/9/16.
 */

import axios = require("axios");

export class Weather {
    current: {
        real_temp: string,
        feels_temp: string,
        wind: string,
        conditions: string
    };

    forecast: Day[];

    constructor (lat: string, long: string) {
    }
}

class Day {
    date: string;
    high: string;
    low: string;
    precipitation: string;
    summary: string;
    icon: string;
    sunrise: string;
    sunset: string;
}
