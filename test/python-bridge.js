const pythonBridge = require("python-bridge");

const python = pythonBridge();

const pyCode = "10 + 12";


python`${pyCode}`.then(x => console.log(x));