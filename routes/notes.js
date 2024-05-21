// routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new note
router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    text: req.body.text
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a note
router.put('/:id', async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a note

router.delete('/:id', async (req, res) => { // Corrected path to '/:id'
    try {
    //   console.log(id);
    //   console.log(note.findById(req.params.id))
      await Note.findByIdAndDelete(req.params.id);
      res.json({ message: 'Note deleted' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
module.exports = router;
