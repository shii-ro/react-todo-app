require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;

console.log(url)

mongoose.connect(url)
    .then((result) => console.log('Connected to MongoDB!'))
    .catch((error) => {
        console.log('Error connecting to MongoDB: ', error.message)
    })

//Define Schema
const Schema = mongoose.Schema;

const TaskModelSchema = new Schema({
    content: String,
    done: Boolean,
})

TaskModelSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Compile model from schema
const Task = mongoose.model("Task", TaskModelSchema);

module.exports = Task;