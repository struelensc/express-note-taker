const notes = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

notes.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    }
  });
});

module.exports = notes;
