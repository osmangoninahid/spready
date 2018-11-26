const ora = require("ora");
const spinners = require("cli-spinners");

const Spinner = new ora({
  text: "Creating your project..."
});
let index = 0;
const types = Object.keys(spinners);

setInterval(function() {
  Spinner.spinner = spinners["line"];
}, 500);

module.exports = Spinner;
