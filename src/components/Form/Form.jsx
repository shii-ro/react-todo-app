import React from 'react'
import "./Form.css"

const Form = (props) => {
    return (
        <form onSubmit={props.onSubmit} className="todo-list__form">
            <input type='text' placeholder={props.placeholder} onChange={props.onChange} value={props.value} required />
            <button type='submit'>Submit<i className=""/></button>
        </form>
    )
}

export default Form