import React from 'react'
import './ListMenu.css'

const ListMenu = ({ filter, showAllHandler, showDoneHandler, showTodoHandler }) => {
    console.log(filter);
    return (
        <div className='todo-list__menu'>
            <h1>Filter</h1>
            <div className='todo-list__menu-buttons'>
                <button id={filter === 'All' ? 'button--selected' : ''} onClick={showAllHandler}>All</button>
                <button id={filter === 'Active' ? 'button--selected' : ''} onClick={showTodoHandler}>Active</button>
                <button id={filter === 'Completed' ? 'button--selected' : ''} onClick={showDoneHandler}>Completed</button>
            </div>
        </div>
    )
}

export default ListMenu