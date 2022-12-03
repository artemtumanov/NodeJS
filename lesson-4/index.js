const fs = require("fs.promises");
const { lstatSync } = require("fs");
const inquirer = require("inquirer");
const yargs = require("yargs");
const path = require("path");

let currentDirectory = process.cwd();
const options = yargs
  .usage("Usage: -d <Path to directory> -p <Pattern> ")
  .positional("d", {
    describe: "Path to directory",
    default: process.cwd(),
  })
  .positional("p", {
    describe: "Pattern",
    default: "",
  }).argv;

class ListItem {
  constructor(path, fileName) {
    this.path = path;
    this.fileName = fileName;
  }
  get isDir() {
    return lstatSync(this.path).isDirectory();
  }
}

if (options.d !== null) {
  currentDirectory = path.join(__dirname, options.d);
}

const run = async () => {
  const list = await fs.readdir(currentDirectory);
  const items = list.map(
    (fileName) => new ListItem(path.join(currentDirectory, fileName), fileName)
  );

  const item = await inquirer
    .prompt([
      {
        name: "fileName",
        type: "list",
        message: `Choose: ${currentDirectory}`,
        choices: items.map((item) => ({ name: item.fileName, value: item })),
      },
    ])
    .then((answer) => answer.fileName);

  if (item.isDir) {
    currentDirectory = item.path;
    return await run();
  } else {
    const data = await fs.readFile(item.path, "utf-8");

    if (options.p == null) {
      console.log(data);
    } else {
      const regExp = new RegExp(options.p, "igm");
      let matchExp = data.match(regExp);
      if (matchExp) {
        console.log("Найденные совпадения:", matchExp);
      } else {
        console.log("Совпадений не найдено!");
      }
    }
  }
};

run();