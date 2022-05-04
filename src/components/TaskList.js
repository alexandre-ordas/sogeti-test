import React from "react"
import Task from "./Task"

const TaskList = ({ tasks }) => (

    <ul className="list-unstyled">
        {tasks.map(task => (
            <li key={task.id} className={"py-2"}>
                <Task
                    task={task}
                />
            </li>
        ))}
    </ul>
)


export default TaskList

//