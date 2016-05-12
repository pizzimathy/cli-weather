declare module "Config" {
    interface Config {
        ip?: string;
        address?: string;
        argv: any;
        units: string;
    }

    class IpConfig implements Config {
        ip: string;
        argv: any;
        units: string;
    }

    class AddrConfig implements Config {
        address: string;
        argv: any;
        units: string;
    }
}