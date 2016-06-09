/**
 * Created by apizzimenti on 5/10/16.
 */

export interface Config {
    ip?: string;
    address?: string;
    argv: any;
    units: string;
}

export class IpConfig implements Config {
    ip: string;
    argv: any;
    units: string;

    constructor (ip: string, argv: any) {
        this.ip = ip;
        this.argv = argv;
        this.units = argv["c"] || "f";
    }
}

export class AddrConfig implements Config {
    address: string;
    argv: any;
    units: string;

    constructor (argv: any) {
        this.address = argv["address"] || argv["z"] || argv["a"];
        this.argv = argv;
        this.units = argv["c"] || "f";
    }
}
