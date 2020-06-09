#!/usr/bin/env node

var path = require("path");
var fs = require("fs");
var StringToJSX = require("../lib/html-to-jsx");
var capitalize = require("../lib/capitalize");

const yargs = require("yargs");

const options = yargs.usage("Usage: -n <name>").option("deleteOriginals", {
  alias: "d",
  describe: "should delete original files",
  type: "boolean",
  demandOption: false,
}).argv;

console.log(options);

function readFileAsync(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", function (err, data) {
      if (err) throw err;
      resolve(data);
    });
  });
}
function writeFileAsync(filename, contents) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, contents, function (err, data) {
      if (err) throw err;
      resolve(data);
    });
  });
}
function deleteFile(filename) {
  return new Promise((resolve, reject) => {
    fs.unlink(filename, function (err) {
      if (err) throw err;
      resolve();
    });
  });
}

function read(dir) {
  if (dir.indexOf("node_modules") > -1) return;
  fs.readdir(dir, function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    files.forEach(async function (file) {
      if (file.indexOf(".") === -1) {
        return read(path.join(dir, file));
      }
      if (file.indexOf(".svg") > -1) {
        try {
          const currentContents = await readFileAsync(path.join(dir, file));
          await writeFileAsync(
            path.join(dir, file).replace(".svg", ".jsx"),
            StringToJSX(
              currentContents,
              capitalize(file.replace(".svg", "")).replace(" ", "")
            )
          );
          if (options.deleteOriginals) {
            await deleteFile(path.join(dir, file));
          }
        } catch (e) {
          console.error(e);
        }
      }
      console.log(path.join(dir, file));
    });
  });
}

read(process.cwd());
