const fs = require('fs-extra');
const { exec } = require('child_process');
const path = require('path');
'use strict';

function copyTemplate(execPath, type) {

    const folderName = `${type}-template`,
        sourceFolder = path.join(process.cwd(), 'lib', folderName),
        targetFolder = path.join(execPath, folderName);

    fs.copy(sourceFolder, targetFolder)
        .then(() => {
            console.log(`${folderName} copied successfully!`);
        })
        .catch(err => {
            console.error(err);
        });
}

function runCommand(command) {
    exec(command, (err, stdout, stderr) => {
        if (err)
            console.error(err);
    })
}

module.exports = {
    copyTemplate,
    runCommand
}