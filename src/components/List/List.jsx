import React, { useState } from 'react'
import ListItem from './ListItem';
import "./List.css"
import ListMenu from './ListMenu';

const FILTER_MAP = {
    All: () => true,
    Active: (task) => !task.done,
    Completed: (task) => task.done
};

const List = ({ taskList, deleteTaskHandler, updateTaskHandler }) => {
    const [filter, setFilter] = useState('All');
    const [editMode, setEditMode] = useState(-1);

    const editModeHandler = (index) => {
        setEditMode(index);
    }

    const showAllHandler = () => {
        setFilter('All');
    }

    const showDoneHandler = () => {
        setFilter('Completed');
    }

    const showTodoHandler = () => {
        setFilter('Active');
    }


    return (
        <>
            <ListMenu filter={filter} showAllHandler={showAllHandler} showTodoHandler={showTodoHandler} showDoneHandler={showDoneHandler} />
            <ul className='todo-list__list'>
                {taskList.filter(FILTER_MAP[filter]).map((item, index) =>
                    <ListItem
                        key={index}
                        item={item}
                        index={index}
                        deleteTaskHandler={deleteTaskHandler}
                        updateTaskHandler={updateTaskHandler}
                        editMode={editMode}
                        editModeHandler={editModeHandler}
                    />
                )}
            </ul>
        </>
    )
}


export default List