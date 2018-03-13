"use strict";

const path = require("path");
const fs = require("fs-extra");
const { spawnSync } = require("child_process");

/**
 * return the path of the directory
 * @param  {String} dirName the name of the project and dirname
 * @return {String} a path for the directory
 */
async function createFolder(dirName) {
  try {
    const name = dirName.toLowerCase().replace(" ", "");
    if (!name) {
      throw new Error("The name cant be empty");
    }
    if (!await fs.pathExistsSync(name)) {
      const folderPath = path.join(path.resolve(), name);
      fs.ensureDirSync(name);
      await createPackageJson(name, folderPath);
      return folderPath;
    }
  } catch (err) {
    throw err;
  }
}

function createPackageJson(name, folderPath) {
  return new Promise(resolve => {
    resolve(
      spawnSync("sh", [`${path.join(__dirname, "..", "scripts", "createPackage.sh")}`], {
        cwd: folderPath
      })
    );
  });
}

module.exports = createFolder;
