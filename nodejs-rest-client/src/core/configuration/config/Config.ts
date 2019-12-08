import { ConfigError } from '..';

export class Config {

    public static readonly API_HOST: string = Config.getVariable('API_HOST', { type: 'string' });

    public static readonly API_PORT: number = Config.getVariable('API_PORT', { type: 'number' });

    public static readonly API_BASE_PATH: string = Config.getVariable('API_BASE_PATH', { type: 'string' });

    public static readonly API_DOCUMENTATION_HOST: string
        = Config.getVariable('API_DOCUMENTATION_HOST', { type: 'string' });

    public static readonly API_CLUSTER_ENABLE: number = Config.getVariable('API_CLUSTER_ENABLE', { type: 'number' });

    public static readonly CLAMAV_HOST: string = Config.getVariable('CLAMAV_HOST', { type: 'string' });

    public static readonly CLAMAV_PORT: number = Config.getVariable('CLAMAV_PORT', { type: 'number' });

    public static readonly CLAMAV_TIMEOUT: number = Config.getVariable('CLAMAV_TIMEOUT', { type: 'number' });

    public static readonly LOG_FORMAT: 'TEXT'|'JSON' = Config.getVariable('LOG_FORMAT', { type: 'string' });

    public static readonly LOG_DISABLE_COLORS: number = Config.getVariable('LOG_DISABLE_COLORS', { type: 'number' });

    private static getVariable<T = (string | number)>(variable: string, options: { type: 'string' | 'number' }): T {
        const value: string | undefined = process.env[variable];

        if (value === undefined) {
            throw ConfigError.createVariableNotSetError(variable);
        }

        /*tslint:disable-next-line*/
        let parsedValue: any = value;

        if (options.type === 'number') {
            parsedValue = parseInt(parsedValue, 10);

            if (typeof parsedValue !== 'number') {
                throw ConfigError.createVariableParsingError(variable);
            }
        }

        return parsedValue;
    }

}
