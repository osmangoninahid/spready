"use strict";

const path = require("path");
const fs = require("fs-extra");
const { spawnSync } = require("child_process");
const templatesPath = path.join(__dirname, "..", "templates");

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createEnvVariables(dirPath) {
  try {
    if (!dirPath) {
      throw new Error("The path cant be empty");
    }
    await installDotenv(dirPath);
    await createDotenvFile(dirPath);
    await importFile(dirPath);
  } catch (err) {
    throw err;
  }
}

/**
 * creates an example file of varibale.env that will be track by git and serve as example of env needed
 * @param  {String} dirName the name of the project and dirname
 */
async function createExampleEnvVariables(dirPath) {
  await fs.copySync(`${dirPath}/variables.env`, `${dirPath}/variables.env.example`);
}

function installDotenv(dirPath) {
  return new Promise(resolve => {
    resolve(
      spawnSync("sh", [`${path.join(__dirname, "..", "scripts", "installDotenv.sh")}`], {
        cwd: dirPath
      })
    );
  });
}

async function createDotenvFile(dirPath) {
  await fs.ensureDirSync(dirPath);
  await fs.copySync(`${templatesPath}/starterFileVariablesEnv.txt`, `${dirPath}/variables.env`);
}

async function importFile(dirPath) {
  const data = await fs.readFileSync(`${dirPath}/app.js`, "utf8");
  const result = data.replace(/^#dotenv$/gm, "require('dotenv').config({ path: 'variables.env' })");
  await fs.outputFileSync(`${dirPath}/app.js`, result);
}

module.exports = { createEnvVariables, createExampleEnvVariables };
