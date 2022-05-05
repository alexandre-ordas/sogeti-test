import React from "react";
import {useNavigate} from "react-router-dom";
import TaskForm from "./TaskForm";

const CreateExpenseForm = ({addTask}) => {

    const navigate = useNavigate()

    return(
        <div>
            <div>
                <h2 className={"text-center my-3"}>Create a new task</h2>
                <TaskForm
                    onSubmit={taskInfos => {
                        addTask(taskInfos)
                        navigate('/')
                    }}
                    onCancel={() => { navigate('/')}}
                />
            </div>
        </div>
    )
}

export default CreateExpenseForm