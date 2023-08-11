import { mkdir, readFile, stat, writeFile } from 'fs/promises';
import { URL } from 'url';

type JSONValue = string | number | boolean | JSONObject | JSONArray | null;
type JSONObject = { [x: string]: JSONValue };
interface JSONArray extends Array<JSONValue> {}

const DATA_DIR = new URL('../../data/', import.meta.url);

class JSONData<T extends JSONValue> {
    data: T;
    private path: URL;

    constructor(
        name: string,
        private defaultData: T,
    ) {
        this.path = new URL(`./${name}.json`, DATA_DIR);
        this.data = defaultData;
    }

    private async ensureFileExists() {
        await stat(DATA_DIR).catch(() => mkdir(DATA_DIR));
        await stat(this.path).catch(() =>
            writeFile(this.path, JSON.stringify(this.data), {
                encoding: 'utf8',
            }),
        );
    }

    async read() {
        await this.ensureFileExists();
        this.data =
            JSON.parse(await readFile(this.path, { encoding: 'utf8' })) ??
            this.defaultData;
    }

    async write() {
        await this.ensureFileExists();
        await writeFile(this.path, JSON.stringify(this.data), {
            encoding: 'utf8',
        });
    }
}

class GuildBasedJSONData<T extends JSONValue> extends JSONData<{
    [x: string]: T;
}> {
    constructor(
        name: string,
        private defaultGuildData: T,
    ) {
        super(name, {});
    }

    get(guildId: string) {
        if (!this.data[guildId])
            this.data[guildId] = structuredClone(this.defaultGuildData);
        return this.data[guildId] as T;
    }
}

export { GuildBasedJSONData, JSONData };
