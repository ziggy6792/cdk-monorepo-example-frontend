#!/usr/bin/env node
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import path from 'path';
import axios from 'axios';
import fs from 'fs';
import util from 'util';
import jsonBeautify from 'json-beautify';
import config from './config';
import log from './log';

const writeFile = util.promisify(fs.writeFile);

enum ValidCommands {
    FETCH_SCHEMA = 'fetch-schema',
}
interface IArgs {
    _: string[];
    useLocal?: boolean;
    toFile: string;
}

const main = async () => {
    const args = (yargs(hideBin(process.argv)).argv as unknown) as IArgs;

    log('Recieved Args', args);

    const command = args?._.length && args._[0];

    log('Recieved Command', command);

    switch (command) {
        case ValidCommands.FETCH_SCHEMA:
            await fetchSchema(args);
            return;
        default:
            log('Command not valid', command);
            throw new Error(`Command not valid: ${command}`);
    }
};

const fetchSchema = async (args: IArgs) => {
    if (!args.toFile) {
        throw new Error('Invalid Args');
    }

    const callingDirectory = process.env.PWD;

    log('Calling Directory', callingDirectory);

    let endpoint = config.hostedEndpoint;

    if (args.useLocal) {
        const configFile = path.join(callingDirectory, config.localConfig.file);

        const env = await require(configFile);

        endpoint = env[config.localConfig.endpointKey];
    }

    const fileToWrite = path.join(callingDirectory, args.toFile);
    log('Using endpoint', endpoint);

    log('To File Full Path', fileToWrite);

    const result = await axios.post(endpoint, {
        variables: {},
        query: `
          {
            __schema {
              types {
                kind
                name
                possibleTypes {
                  name
                }
              }
            }
          }
        `,
    });

    if (!result?.data?.data) {
        throw new Error('Could not get schema');
    }

    const schemaJson = jsonBeautify(result.data.data, null, 2, 100);

    await writeFile(fileToWrite, schemaJson);
};

export default main;
