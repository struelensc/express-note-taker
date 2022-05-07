const fs = require("fs");
const util = require("util");

const promiseReadFile = util.promisify(fs.readFile);

const writeFile = (des, data) => {
  fs.writeFile(des, JSON.stringify(data), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${des}`)
  );
};

const readAndWrite = (des, note) => {
  fs.readFile(des, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(note);
      writeFile(des, parsedData);
    }
  });
};

module.exports = { promiseReadFile, writeFile, readAndWrite };
