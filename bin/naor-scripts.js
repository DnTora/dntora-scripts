#!/usr/bin/env node
'use strict';

process.on('unhandledRejection', err => {
    throw err;
});

const exec = require('../lib/naor-scripts');
const args = process.argv.slice(2);
const scriptIndex = args.findIndex(
    name => name === 'build' || name === 'test'
);
const script = scriptIndex === -1 ? null : args[scriptIndex];
console.log(process.cwd())
if (['build'].includes(script)) {
    exec(process.cwd(), script, args[1]);
} else {
    console.log('Unknown script "' + script + '".');
    console.log('Perhaps you need to update naor-scripts?');
}