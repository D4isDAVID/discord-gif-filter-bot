import { GuildBasedJSONData } from '../json-data.js';

export enum ExceptionType {
    User,
    Role,
    Channel,
}

export type ConfigData = {
    maxSize: number;
    keywords: string[];
    exceptions: Record<string, { type: ExceptionType }>;
};

const config = new GuildBasedJSONData<ConfigData>('gif-filter-config', {
    maxSize: 1000,
    keywords: [],
    exceptions: {},
});

await config.read();
export default config;
