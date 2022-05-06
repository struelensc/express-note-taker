const notes = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const file = "./db/db.json";

notes.get("/notes", (req, res) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    }
  });
});

notes.post("/notes", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    fs.readFile(file, "utf8", function (err, data) {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(newNote);

        fs.writeFile(file, JSON.stringify(parsedData), (err) =>
          err ? console.error(err) : console.info(`\nData written to ${file}`)
        );
      }
    });
    res.json("Note added successfully");
  } else {
    res.error("Error in adding note");
  }
});

module.exports = notes;
