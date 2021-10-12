const mongoose = require('mongoose')

const adminuser = 'admin';
const adminpassword = 'admin';
const dbname = 'notes-app';

const url = `mongodb+srv://${adminuser}:${adminpassword}@notes-app.v5p6n.mongodb.net/${dbname}?retryWrites=true&w=majority`

const connectionParams = {
    useNewUrlParser: true,
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })