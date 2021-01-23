#!/usr/bin/env node

import AWS from 'aws-sdk';
import fs from 'fs';
import util from 'util';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import path from 'path';
import jsonBeautify from 'json-beautify';
import fetchConfig from './fetch-config';

const writeFile = util.promisify(fs.writeFile);

enum ValidCommands {
    COPY_CONFIG = 'copy-config',
}
interface IArgs {
    _: string[];
    fromSsm: string;
    toFile: string;
}

const log = (...args) => {
    console.log('Fetch Config:', ...args);
};

AWS.config.update({ region: 'ap-southeast-1' });

const main = async () => {
    const args = (yargs(hideBin(process.argv)).argv as unknown) as IArgs;

    log('Recieved Args', args);

    const command = args?._.length && args._[0];

    log('Recieved Command', command);

    if (command !== ValidCommands.COPY_CONFIG) {
        log('Command not valid', command);

        throw new Error(`Command not valid: ${command}`);
    }

    await copyConfig(args);
};

const copyConfig = async (args: IArgs) => {
    if (!args.fromSsm || !args.toFile) {
        throw new Error('Invalid Args');
    }

    const callingDirectory = process.env.PWD;

    log('Calling Directory', callingDirectory);

    const fileToWrite = path.join(callingDirectory, args.toFile);

    log('To File Full Path', fileToWrite);

    const config = await fetchConfig(args.fromSsm);

    log('Recievd Config', config);

    if (!fs.existsSync(fileToWrite)) {
        log('File not fouund', fileToWrite);
        throw new Error(`File not fouund: ${fileToWrite}`);
    }

    const jsonEnvConfig = jsonBeautify(config, null, 2, 100);

    await writeFile(fileToWrite, `window.env = ${jsonEnvConfig}`);
};

main()
    .then(() => {
        log('SUCCESS');
        process.exit(0);
    })
    .catch((err) => {
        log('ERROR', err);

        process.exit(1);
    });

// console.log('aws-config-helper bla');
