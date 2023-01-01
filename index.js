const express = require('express');
require('dotenv').config();
const Task = require('./models/task.js')
const app = express();

app.use(express.json());
app.use(express.static(__dirname + '/build'));

app.get('/api/tasks', (req, res) => {
    Task.find({}).then(task => res.json(task));
})

app.get('/api/tasks/:id', (req, res) => {
    Task.findById(req.params.id)
        .then(savedTask =>
            {
                if(savedTask) res.json(savedTask)
                else res.status(404).end();
            })
        .catch(error => console.log(error.message))
})

app.post('/api/tasks', (req, res) => {
    const newTask = new Task({...req.body});

    newTask.save()
        .then(savedTask => res.json(savedTask))
        .catch(error => console.log(error.message));
})

app.put('/api/tasks/:id', (req, res) => {
    const task = {...req.body};

    Task.findByIdAndUpdate(req.params.id, task, { new: true})
        .then(savedTask => res.json(savedTask))
        .catch(error => console.log(error.message));
})

app.delete('/api/tasks/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(result => res.status(204).end())
        .catch(error => console.log(error.message))
})

app.listen(3000, () => console.log("Connected!"));