"use strict";

const path = require("path");
const fs = require("fs-extra");
const templatesPath = path.join(__dirname, "..", "templates");
const { spawnSync } = require("child_process");
const createModule = require("../commands/createModule");
/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createStarterFiles(dirPath) {
  try {
    if (!dirPath) {
      throw new Error("The path cant be empty or cant be any previous name");
    }
    await createIndexFile(dirPath);
    await createBinFile(dirPath);
    await createModulesDirectory(dirPath);
    await createRoutesFile(dirPath);
    await createLoggerFile(dirPath);
    await createGitIgnoreFileAndBabelrc(dirPath);
    await editPackageJson(dirPath);
  } catch (err) {
    throw err;
  }
}

async function createModulesDirectory(dirPath) {
  let dir = "/modules";
  if (!await fs.existsSync(dirPath + dir)) {
    await fs.mkdirSync(dirPath + dir);
    await createModule(dirPath, "Example");
  }
}

async function createBinFile(dirPath) {
  await fs.copySync(`${templatesPath}/starterFileBin.txt`, `${dirPath}/bin/www`);
}

async function createIndexFile(dirPath) {
  await fs.copySync(`${templatesPath}/starterFileIndex.txt`, `${dirPath}/app.js`);
}

async function createRoutesFile(dirPath) {
  await fs.ensureDirSync(dirPath);
  await fs.copySync(`${templatesPath}/rootRoute.txt`, `${dirPath}/routes/index.js`);
}

async function createLoggerFile(dirPath) {
  await installLogger(dirPath);
  await fs.ensureDirSync(dirPath);
  await fs.copySync(`${templatesPath}/starterLogger.txt`, `${dirPath}/libs/logger.js`);
}

function installLogger(dirPath) {
  return new Promise(resolve => {
    resolve(
      spawnSync("sh", [`${path.join(__dirname, "..", "scripts", "installLogger.sh")}`], {
        cwd: dirPath
      })
    );
  });
}

async function createGitIgnoreFileAndBabelrc(dirPath) {
  await fs.ensureDirSync(dirPath);
  await fs.copySync(`${templatesPath}/starterFileGitignore.txt`, `${dirPath}/.gitignore`);
  await fs.copySync(`${templatesPath}/babelrc.txt`, `${dirPath}/.babelrc`);
}

async function editPackageJson(dirPath) {
  const data = await fs
    .readFileSync(`${dirPath}/package.json`, "utf8")
    .toString()
    .split("\n");
  const scriptPosition = data.indexOf('  "scripts": {');
  data.splice(
    scriptPosition + 1,
    0,
    '    "start": "nodemon --exec babel-node ./bin/www",\n    "dev": "NODE_ENV=development DEBUG=api-server:* npm run start",\n    "debug": "DEBUG=api-server:* npm run start",'
  );
  const text = data.join("\n");
  await fs.outputFileSync(`${dirPath}/package.json`, text);
}

module.exports = createStarterFiles;
