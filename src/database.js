const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/notes-app', {
    useNewUrlParser: true,
}).then(db => console.log('MongoDB Connected')).catch(err => console.error(err));