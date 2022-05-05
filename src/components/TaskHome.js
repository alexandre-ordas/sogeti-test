import React, {useState, useEffect, useCallback} from "react"
import TaskList from "./TaskList";
import {Link} from "react-router-dom";

const TaskHome = ({tasks, setTaskStatus}) => {

    return (
        <div>
            <div className={"d-flex justify-content-between"}>
                <h1 className={"p-3"}>Todolist</h1>
                {/*<Link to="/" className="btn btn-primary" >
                    Add Task
                </Link>*/}
            </div>

            <TaskList
                tasks={tasks}
                setTaskStatus={setTaskStatus}

            />
        </div>
    )
}

export default TaskHome