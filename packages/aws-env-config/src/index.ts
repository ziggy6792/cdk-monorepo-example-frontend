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
interface IArgs {
    fromSsm: string;
    toFile: string;
}

const args = (yargs(hideBin(process.argv)).argv as unknown) as IArgs;

console.log('argv', args);

if (!args.fromSsm || !args.toFile) {
    throw new Error('Invalid Args');
}

AWS.config.update({ region: 'ap-southeast-1' });

process.argv.forEach((val, index, array) => {
    console.log(`${index}: ${val}`);
});

// util.inspect(process);

const cwdDir = process.env.PWD;

console.log('cwdDir!!!!!', cwdDir);

const main = async () => {
    const config = await fetchConfig(args.fromSsm);

    const fileToWrite = path.join(cwdDir, args.toFile);

    console.log(config);
    console.log(fileToWrite);

    const jsonEnvConfig = jsonBeautify(config, null, 2, 100);

    writeFile(fileToWrite, `window.env = ${jsonEnvConfig}`);
};

main()
    .then((response) => {
        console.log(response);
    })
    .catch((err) => console.log(err));

// console.log('aws-env-config bla');
