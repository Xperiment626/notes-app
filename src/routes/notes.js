const express = require('express');
const router = express.Router();
const controller = require('../controllers/notes-controller');

router.get('/notes/add', controller.isAuthenticated, controller.add_notes);

router.post('/notes/create-note', controller.isAuthenticated, controller.create_note);

router.get('/notes', controller.isAuthenticated, controller.getAllNotes);

router.get('/notes/edit/:id', controller.isAuthenticated, controller.edit);

router.put('/notes/edit-note/:id', controller.isAuthenticated, controller.edit_note);

router.delete('/notes/delete/:id', controller.isAuthenticated, controller.delete);

module.exports = router;