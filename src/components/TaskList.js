import React from "react"
import Task from "./Task"
import "./TaskList.css"

const TaskList = ({ tasks, setTaskStatus }) => (

    <ul className="list-unstyled">
        {tasks.map(task => (
            <li key={task.id} className={task.isDone ? "text-success py-2" : "py-2"}>
                <Task
                    task={task}
                    setTaskStatus={isDone => setTaskStatus(task.id, isDone) }
                />
            </li>
        ))}
    </ul>
)


export default TaskList

//