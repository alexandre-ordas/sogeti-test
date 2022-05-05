import React from 'react';
import {Link, useParams} from "react-router-dom";

function TaskDetails({tasks}) {
    const {id} = useParams()
    const task = tasks.find(e => e.id === Number(id))
    return (
        <div className={"text-center"}>
            <h2 className={"text-center"}>Task Details</h2>

            <p className={"text-center"}><strong>{task.label}</strong></p>
            <p>Date: <strong>{task.date}</strong></p>
            <p>Description: {task.description}</p>

            <Link to="/" className="btn btn-dark mx-2">
                Back
            </Link>

            <Link to={`/edit/${tasks.id}`} className="btn btn-secondary mx-2">
                Edit
            </Link>
        </div>
    );
}

export default TaskDetails;