import React, {useState, useEffect, useCallback} from "react"
import TaskList from "./TaskList";
import {Link} from "react-router-dom";

const TaskHome = ({tasks, setTasks}) => {

    const removeTask = label => {
        setTasks(tasks => tasks.filter(task => task.label !== label))
    }

    const setTaskStatus = useCallback(
        (taskId, isDone) => {
            const taskIndex = tasks.findIndex(t => t.id === taskId)
            const tasksBefore = tasks.slice(0, taskIndex)
            const tasksAfter = tasks.slice(taskIndex + 1)
            const newTask = {...tasks[taskIndex], isDone}
            if (isDone) {
                setTasks([...tasksBefore, ...tasksAfter, newTask])
            }
            else {
                setTasks([...tasksBefore, newTask, ...tasksAfter])
            }
        },
        [tasks],
    )


    return (
        <div>
            <div className={"d-flex justify-content-between"}>
                <h1 className={"p-3"}>Todolist</h1>
                <button className="btn btn-primary btn-lg m-3">
                    <Link to="/add-task" className={"text-decoration-none text-white"} >
                        Add Task
                    </Link>
                </button>
            </div>

            <TaskList
                tasks={tasks}
                setTaskStatus={setTaskStatus}
                removeTask={removeTask}


            />
        </div>
    )
}

export default TaskHome