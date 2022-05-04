import React, {useState, useEffect, useCallback} from "react"
import TaskList from "./TaskList";

const App = () => {
    const [nextId, setNextId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [hasFetchedFirst, setHasFetchedFirst] = useState(false)

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

    useEffect(() => {
        if (!hasFetchedFirst) {
            setHasFetchedFirst(true)
            setHasError(false)
            setIsFetching(true)
            fetch('https://jsonplaceholder.typicode.com/users/10/todos')
                .then(res => res.json())
                .then(newTasks => {
                    setIsFetching(false)
                    setTasks(
                        newTasks.map(task => ({
                            id: task.id,
                            label: task.title,
                            isDone: false,
                        })),
                    )
                    setNextId(Math.max(...newTasks.map(task => task.id)) + 1)
                })
                .catch(() => setHasError(true))

        }
    })

    if (hasError) {
        return <p>An error occur...</p>
    }

    if (isFetching) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <h1 className={"p-3"}>Todolist</h1>

            <TaskList
                tasks={tasks}
                setTaskStatus={setTaskStatus}

            />

        </div>
    )

}

export default App