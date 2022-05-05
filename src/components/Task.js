import React from "react"
import {Link} from "react-router-dom";

const Task = ({ task, setTaskStatus, remove }) => {
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
                    to={`/details/${task.id}`}
                    className={`text-decoration-none
                    ${task.isDone ? "text-decoration-line-through text-success" : "text-black"}`}>
                    <p className="mx-3">{task.label}</p>
                </Link>
            </div>
            <div className="d-flex">
                <button
                    type="button"
                    className="btn btn-secondary btn-lg mx-3"
                > <Link to={`/edit/${task.id}`} className={"text-decoration-none text-white"}>
                   Edit
                </Link>
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    onClick={() => {
                        remove(task.label)
                    }}
                >
                    Delete
                </button>
            </div>
        </label>
    )
}

export default Task