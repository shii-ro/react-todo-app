import React, { useState } from "react";
import "./ListItem.css"

const ListItem = ({item, index, deleteTaskHandler, updateTaskHandler, editMode, editModeHandler}) => {
    const [itemContent, setItemContent] = useState(item.content);
    const [taskDone, setTaskDone] = useState(item.done);

    const setTaskDoneHandler = () => {
        setTaskDone((oldState) => !oldState);
        updateTaskHandler(item.id, {...item, done: !taskDone});
    }

    const itemContentHandler = (event) => {
        setItemContent(event.target.value);
    }

    const submitFormHandler = (event) => {
        event.preventDefault();
        editModeHandler(-1);
        updateTaskHandler(item.id, {...item, content: itemContent});
    }

    return (
        <li key={index} className="list__item">
            {editMode === index 
                ? <form onSubmit={submitFormHandler}>
                    <input
                        className="list__item-input"
                        value={itemContent}
                        onChange={itemContentHandler}
                        autoFocus/>
                   </form>
                : <p className={item.done ? "list__content--done" : "list__content--notdone"}>{item.content}</p>}
            <div className="list__buttons">
                <button className="list__button" onClick={setTaskDoneHandler}><i className={item.done ? "fa-regular fa-square-check" : "fa-regular fa-square"} /></button>
                <button className="list__button" onClick={() => editModeHandler(editMode === index ? -1 : index)}><i className="fa-regular fa-pen-to-square"></i></button>
                <button className="list__button" onClick={() => deleteTaskHandler(item.id)}><i className="fa-regular fa-trash-can"></i></button>
            </div>
        </li>
    )
}

export default ListItem;