#!/usr/bin/env node

"use strict";
const program = require("commander");
const createProject = require("../commands/createProject");
const createModule = require("../commands/createModule");
const { exec } = require("child_process");

program
  .version("0.0.1")
  .usage("[option][name]")
  .option("    --init", "initialize your project, create new project scaffolding")
  .option("-am, --add-module", "Add new module")
  .option("-rm, --remove-module", "Remove existing module")
  .option("    --git", "add .gitignore")
  .parse(process.argv);

if (!program.args.length) {
  program.help();
} else {
  switch (program.args[0]) {
    case "init":
      createProject();
      break;
    case "add-module":
      if (program.args[1] && typeof program.args[1] !== "undefined") {
        let name = program.args[1].replace(/\r?\n|\r/g, "");
        exec("pwd", function(err, out, stderr) {
          createModule(out.replace(/\r?\n|\r/g, ""), program.args[1].replace(/\r?\n|\r/g, ""));
        });
      } else {
        console.log("Module name cant be empty");
        program.help();
      }
      break;
    case "remove-module":
      console.log("here you remove your modules");
      break;
    default:
      program.help();
  }
}
