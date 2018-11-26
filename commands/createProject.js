const inquirer = require("inquirer");
const ora = require("ora");
const Spinner = new ora({
  text: "Creating your project....",
  spinner: process.argv[2]
});
const createPackage = require("../services/createPackage");
const createStarterFiles = require("../services/createStarterFiles");
const { createEnvVariables, createExampleEnvVariables } = require("../services/createEnvVariables");
const createMongooseIntegration = require("../services/createMongooseIntegration");

const questions = [
  {
    type: "input",
    name: "name",
    message: "What is your project name ",
    validate: name => typeof name === "string"
  }
];

function createProject() {
  inquirer.prompt(questions).then(answers => handleResponse(answers));
}

async function handleResponse(answers) {
  Spinner.start();
  try {
    const folderPath = await createPackage(answers["name"]);
    await createStarterFiles(folderPath);
    Spinner.info("You are almost done");
    await createEnvVariables(folderPath);
    await createMongooseIntegration(folderPath);
    Spinner.succeed("Starter files created");
    Spinner.succeed("Logger files created");
    Spinner.succeed("Basic module files created");
    await createExampleEnvVariables(folderPath);
    Spinner.stop();
    console.log("You are Ready to hack!");
    console.log();
    console.log("   change directory:");
    console.log("     cd %s", answers["name"]);
    console.log();
    console.log("   ************Configure Mongo Credentials into ./variables.env**********");
    console.log();
    console.log("   run the app:   npm run dev");
  } catch (err) {
    console.log(err);
  }
}

module.exports = createProject;
