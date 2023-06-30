const fs = require('fs-extra');
const { exec } = require('child_process');
const path = require('path');
'use strict';

function copyTemplate(type) {

    const folderName = `${type}-template`,
        sourceFolder = path.join(__dirname, folderName),
        targetFolder = path.join(process.cwd(), folderName);

    try {
        fs.copySync(sourceFolder, targetFolder);
        console.log(`${folderName} copied successfully!`);

    } catch (err) {
        ß
        console.error(err);
    }

}

function runCommand(command, type) {
    const folderName = `${type}-template`,
        pathToExec = path.join(process.cwd(), folderName),
        options = {
            cwd: pathToExec
        };
    exec(command, options, (err, stdout, stderr) => {
        if (err)
            console.error(err);
        else console.log(`install dependencies successfully!`);

    })
}

module.exports = {
    copyTemplate,
    runCommand
}