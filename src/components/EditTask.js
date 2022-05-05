import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import TaskForm from "./TaskForm";

const EditTask = ({tasks, update}) => {

    const navigate = useNavigate()
    const {id} = useParams()
    const task = tasks.find(e => e.id === Number(id))
    return (
        <div>
            <h2 className={"text-center my-3"}>Edit expense</h2>
            <TaskForm
                task={task}
                onSubmit={ taskInfos => {
                    update(taskInfos)
                    navigate(`/`)
                }}
                onCancel={ () => {
                    navigate(`/`)
                }}
            />
        </div>
    )
}

export default EditTask;