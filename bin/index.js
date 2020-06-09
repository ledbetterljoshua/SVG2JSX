#!/usr/bin/env node

var path = require("path");
var fs = require("fs");
var StringToJSX = require("../lib/html-to-jsx");
var capitalize = require("../lib/capitalize");

const yargs = require("yargs");

const generateIndexFile = true;

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

function fileIsDir(file) {
  return file.indexOf(".") === -1;
}

function getComponentName(file, dir) {
  const dirs = dir.split("/");
  const prevDir = dirs[dirs.length - 1];
  return `${capitalize(prevDir).replace(/ /g, "")}${capitalize(
    file.replace(".svg", "")
  ).replace(/ /g, "")}`;
}

function read(dir) {
  if (dir.indexOf("node_modules") > -1) return;
  fs.readdir(dir, async function (err, files) {
    //handling error
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    //listing all files using forEach
    const dirList = [];
    const fileList = [];
    files.forEach(async function (file) {
      if (fileIsDir(file)) {
        return read(path.join(dir, file));
      }

      if (file.indexOf(".svg") > -1) {
        try {
          console.log("dir", dir);
          dirList.push(dir);
          fileList.push(file.replace(/ /g, ""));
          const currentContents = await readFileAsync(path.join(dir, file));
          await writeFileAsync(
            path.join(dir, file).replace(/ /g, "").replace(".svg", ".jsx"),
            StringToJSX(currentContents, getComponentName(file, dir))
          );
          if (options.deleteOriginals) {
            await deleteFile(path.join(dir, file));
          }
          console.log(path.join(dir, file));
        } catch (e) {
          console.error(e);
        }
      }
    });

    if (generateIndexFile) {
      dirList.forEach(async function (directory) {
        await writeFileAsync(
          path.join(directory, "index.js"),
          fileList
            .map(
              (file) =>
                `export { default as ${getComponentName(
                  file,
                  directory
                )} } from './${file.replace(".svg", "")}';\n`
            )
            .join(" ")
        );
      });
    }
  });
}

read(process.cwd());
