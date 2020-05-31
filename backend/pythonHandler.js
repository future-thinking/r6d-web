const pythonBridge = require("python-bridge");

class pythonHandler {
    python;
    started = false;


    constructor() {

    }


    start() {
        this.python = pythonBridge();
        this.started = true;

        this.runFile("imports.py");
    }

    runFile(file) {
        if (!this.started)
            return;

        python.ex`exec(open("python/${file}").read())`
    }

    executePython(python) {
        this.python`exec(${python}`;
    }

    end() {
        this.python.end();
        this.started = false;
    }
}

function getNewInstance() {
    return new pythonHandler();
}

module.exports = getNewInstance;