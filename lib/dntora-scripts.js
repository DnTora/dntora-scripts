const serverBuilder = require('./server-builder');

function build(nodeArgs) {
    if (nodeArgs.includes('server')) {
        serverBuilder();
    }
}


function exec(script, nodeArgs) {
    switch (script) {
        case 'build': build(nodeArgs);
            break;
        case 'server':
            break;
        case 'both':
            break;
    }
}

module.exports = exec;