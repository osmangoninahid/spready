"use strict";

const path = require("path");
const fs = require("fs-extra");
const { spawnSync } = require("child_process");
const templatesPath = path.join(__dirname, "..", "templates");

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 */
async function createMongooseIntegration(dirPath) {
  try {
    if (!dirPath) {
      throw new Error("The path cant be empty");
    }
    await installMongoose(dirPath);
    await appendMongooseDbToEnv(dirPath);
  } catch (err) {
    throw err;
  }
}

function installMongoose(dirPath) {
  return new Promise(resolve => {
    resolve(
      spawnSync("sh", [`${path.join(__dirname, "..", "scripts", "installMongoose.sh")}`], {
        cwd: dirPath
      })
    );
  });
}

async function appendMongooseDbToEnv(dirPath) {
  const data = "MONGO_URL=ADD_YOUR_MONGODB_URL_PLUS_DB_NAME\nMONGO_USER=ADD_YOUR_MONGO_USER \nMONGO_PASSWORD=ADD_YOUR_MONGO_PASSWORD\n";
  await fs.appendFileSync(`${dirPath}/variables.env`, data);
}

async function addRoutes(dirPath) {
  const data = await fs.readFileSync(`${dirPath}/app.js`, "utf8");
  const requireMongoose = data.replace(/^#mongoose$/gm, "const mongoose = require('mongoose')");
  const connectMongoose = requireMongoose.replace(
    /^#connectMongoose$/gm,
    "mongoose.connect(process.env.DATABASE)\nmongoose.connection.on('error', (err) => {\n  console.log(err.message)\n})\nrequire('../models')"
  );
  await fs.outputFileSync(`${dirPath}/app.js`, connectMongoose);
}

module.exports = createMongooseIntegration;
