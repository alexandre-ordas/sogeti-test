import React from "react"
import {Link} from "react-router-dom";

const Task = ({ task, setTaskStatus, removeTask }) => {
    return (

        <label className="d-flex mx-3 justify-content-between">
            <div className="d-flex">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={task.isDone}
                    onChange={event => {
                        const isDone = event.target.checked
                        setTaskStatus(isDone)
                    }}
                />
                <Link
                    to={`/${task.id}/details`}
                    className={`text-decoration-none
                    ${task.isDone ? "text-decoration-line-through text-success" : "text-black"}`}>
                    <p className="mx-3">{task.label}</p>
                </Link>
            </div>
            <div className="d-flex">
                <button
                    type="button"
                    className="btn btn-secondary mx-3"
                > <Link to={`/${task.id}/edit`}>
                   Edit
                </Link>
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                        removeTask(task.label)
                    }}
                >
                    Delete
                </button>
            </div>
        </label>
    )
}

export default Task