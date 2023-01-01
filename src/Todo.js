import React, { useEffect, useState } from 'react'
import Form from './components/Form/Form';
import List from './components/List/List';
import service from './services/todolist';

import "./Todo.css"

const Todo = () => {
    const [task, setTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        service
            .getAll()
            .then(data => setTaskList(data));
    }, [])


    const inputChangeHandler = (event) => {
        setTask(event.target.value);
    }

    const newTaskHandler = (event) => {
        event.preventDefault();
        const newTask = { content: task, done: false };
        setTask("");
        service
            .create(newTask)
            .then(returnedTask => setTaskList((oldList) => oldList.concat(returnedTask)));
    }

    const deleteTaskHandler = (id) => {
        service
            .del(id)
            .then(returnedTask => setTaskList((oldList) => oldList.filter(task => task.id !== id)));
    }

    const deleteAllTasksHandler = () => {
        const allIds = taskList.map(task => task.id);
        allIds.forEach(id => service.del(id));
        setTaskList([]);
    }

    const deleteCompletedHandler = () => {
        const doneIds = taskList.filter(task => task.done === true).map(task => task.id);
        doneIds.forEach(id => service.del(id));
        setTaskList((oldList) => oldList.filter(task => task.done !== true));
    }

    const updateTaskHandler = (id, newObj) => {
        service
            .update(id, newObj)
            .then(returnedTask => {
                setTaskList((oldList) => oldList.map(task => task.id !== returnedTask.id ? task : returnedTask));
            })
    }

    if(!taskList) return;
    return (
        <div className='todo-list'>
            <h1 className='todo-list__title'>Todo List</h1>
            <Form onSubmit={newTaskHandler} placeholder="Add a new task..." onChange={inputChangeHandler} value={task}/>
            <List
                taskList={taskList}
                deleteTaskHandler={deleteTaskHandler}
                updateTaskHandler={updateTaskHandler}
            />
            <div className="todo-list__delete">
                <button onClick={deleteAllTasksHandler}>Delete all tasks</button>
                <button onClick={deleteCompletedHandler}>Delete completed</button>
            </div>
        </div>
    )
}

export default Todo;