const serverBuilder = require('./server-builder');

function build(execPath, nodeArgs) {
    console.log(nodeArgs)
    if (nodeArgs.includes('server')) {
        serverBuilder(execPath);
    }
}


function exec(execPath, script, nodeArgs) {
    switch (script) {
        case 'build': build(execPath, nodeArgs);
            break;
        case 'server':
            break;
        case 'both':
            break;
    }
}

module.exports = exec;