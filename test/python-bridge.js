const pythonBridge = require("python-bridge");

const python = pythonBridge();

const pyCode = 12;
const aa = 10;

python.ex`exec("a = " + ${aa}`;

python`a`.then(x => console.log(x));