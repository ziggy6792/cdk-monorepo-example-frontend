#!/usr/bin/env node

import main from './aws-config-helper';
import log from './log';

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
