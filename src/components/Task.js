import React from "react"

const Task = ({ task }) => {
    return (
        <label className="d-flex mx-3 justify-content-between">
            <div className="d-flex">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked=""
                />
                <p className="mx-3">{task.label}</p>
            </div>
            <div className="d-flex">
                <button
                    type="button"
                    className="btn btn-secondary mx-3"
                    onClick=""
                >
                   Update
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick=""
                >
                    Delete
                </button>
            </div>
        </label>
    )
}

export default Task