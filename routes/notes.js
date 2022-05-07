const notes = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const file = "./db/db.json";
const {
  promiseReadFile,
  writeFile,
  readAndWrite,
} = require("../helpers/fsUtils");

// GET Route for a note
notes.get("/notes", (req, res) => {
  promiseReadFile(file).then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post("/notes", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndWrite(file, newNote);
    res.json("Note added successfully");
  } else {
    res.error("Error in adding note");
  }
});

// DELETE Route for a specific note
notes.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;

  promiseReadFile(file)
    .then((data) => JSON.parse(data))
    .then((jsonData) => {
      const newData = jsonData.filter((note) => note.id !== noteId);

      writeFile(file, newData);

      res.json(`Note ${noteId} has been deleted`);
    });
});

module.exports = notes;
