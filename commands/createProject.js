const inquirer = require("inquirer");
const ora = require("ora");
const spinner = new ora({
  text: "Creating your project",
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
  try {
    spinner.start();
    const folderPath = await createPackage(answers["name"]);
    await createStarterFiles(folderPath);
    await createEnvVariables(folderPath);
    await createMongooseIntegration(folderPath);
    spinner.succeed("Starter files created");
    spinner.succeed("Logger files created");
    spinner.succeed("Basic module files created");
    await createExampleEnvVariables(folderPath);
    spinner.stop();
    console.log("You are Ready to hack!");
  } catch (err) {
    console.log(err);
  }
}

module.exports = createProject;
