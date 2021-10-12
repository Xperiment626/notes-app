const Note = require('../models/Note');
const { isAuthenticated } = require('../helpers/auth');

const controller = {};

controller.isAuthenticated = isAuthenticated;

controller.add_notes = (req, res) => {
    res.render('notes/create-note');
}

controller.create_note = async(req, res) => {
    const { title, description } = req.body;
    const errors = [];

    if (!title) {
        errors.push({ text: 'Please add a title' });
    }
    if (!description) {
        errors.push({ text: 'Please add a description' });
    }
    if (errors.length > 0) {
        res.render('notes/create-note', {
            errors,
            title,
            description
        });
    } else {
        const newNote = new Note({ title, description });
        newNote.user = req.user._id;
        await newNote.save();
        req.flash('success_msg', 'Note added Successfully');
        res.redirect('/notes');
    }
}

controller.getAllNotes = async(req, res) => {
    const all_notes = await Note.find({ user: req.user._id }).sort({ date: 'desc' }).lean();
    res.render('notes/all-notes.hbs', { all_notes });
}

controller.edit = async(req, res) => {
    const note = await Note.findById(req.params.id).lean();
    res.render('notes/edit-note', { note });
}

controller.edit_note = async(req, res) => {
    const { title, description } = req.body;
    await Note.findByIdAndUpdate(req.params.id, { title, description });
    req.flash('success_msg', 'Note updated Successfully');
    res.redirect('/notes');
}

controller.delete = async(req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Note deleted Successfully');
    res.redirect('/notes');
}

module.exports = controller;