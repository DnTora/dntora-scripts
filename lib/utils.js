const fs = require('fs-extra');
const { exec } = require('child_process');
const path = require('path');
'use strict';

function copyTemplate(type) {

    const folderName = `${type}-template`,
        sourceFolder = path.join(__dirname, folderName),
        targetFolder = path.join(process.cwd(), folderName);

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