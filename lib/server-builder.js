const utils = require('./utils');
'use strict';

function getInstallCommand() {
    let command = '';

    function getDevPackagesInstallCommand() {
        return 'npm install dotenv nodemon ts-node @babel/preset-typescript babel-jest @babel/core @babel/preset-env @types/node @types/express eslint eslint-config-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin jest prettier --save-dev'
    }

    function getPackagesInstallCommand() {
        return 'npm install cors express dotenv --save';
    }

    command += getDevPackagesInstallCommand() + " && " + getPackagesInstallCommand();

    return command;
}



function buildServer() {
    utils.copyTemplate('server');
    utils.runCommand(getInstallCommand(), 'server');

}

module.exports = buildServer;


