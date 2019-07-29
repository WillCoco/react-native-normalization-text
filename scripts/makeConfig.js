#!/usr/bin/env node
let fs = require('fs');
let path = require('path');

let name = process.argv[2];

const CUSTOM_CONFIG_FILE = 'RNText.config.js';
const CONFIG_FILE = 'config.js';
const DEFAULT_CONFIG_FILE = 'defaultConfig.js';

makeConfig(name);

function makeConfig(name) {
    if (/--reset/.test(name)) {
        reset();
        return;
    }

    if (/--update/.test(name)) {
        update();
    }
}

function resolvePath = (p) => {
    if (!p.replace) {
        throw new Error('not found path.replace:', p)
    }
    return p.replace(/(?<=require\s*\(\s*['"]\s*)\..*(?=\s*['"]\s*\))/g, function (originPath) {
        return path.join('..',originPath)
    })
}

function reset() {
    const defaultConfig = fs.readFileSync(path.join(__dirname, '../configs', DEFAULT_CONFIG_FILE));
    const res = fs.writeFileSync(path.join(__dirname, '../configs', CONFIG_FILE), defaultConfig);

    if (res) {
        console.log('reset failed!', res);
        return;
    };
    console.log('reset succeed!');
}

function update() {
    fs.exists(path.join(process.cwd(), CUSTOM_CONFIG_FILE), function (exists) {
        if (exists) {
            const customConfig = fs.readFileSync(path.join(process.cwd(), CUSTOM_CONFIG_FILE));
            const res = fs.writeFileSync(path.join(__dirname, '../configs', CONFIG_FILE), customConfig);
            if (res) {
                console.log('update failed!', res);
                return;
            };
            console.log('update succeed!');
        } else {
            console.log('config not found!');
        }
    });
}
