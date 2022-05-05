import React, {useState, useEffect, useCallback} from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TaskHome from "./TaskHome"
import TaskDetails from "./TaskDetails"
import EditTask from "./EditTask";
import AddTask from "./AddTask";

const App = () => {
    const [nextId, setNextId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isFetching, setIsFetching] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [hasFetchedFirst, setHasFetchedFirst] = useState(false)



    const addTask = useCallback(
        label => {
            const newTask = {id: nextId, label}
            setNextId(nextId + 1)
            setTasks([ newTask, ...tasks])
        },
        [nextId, tasks],
    )

    const updateTask = useCallback(
        (label, taskId) => {
            const taskIndex = tasks.findIndex(t => t.id === taskId)
            const tasksBefore = tasks.slice(0, taskIndex)
            const tasksAfter = tasks.slice(taskIndex + 1)
            const newName = {...tasks[taskIndex]}
            setTasks([...tasksBefore, newName, ...tasksAfter])
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
            <Router>
                <Routes>
                    <Route path="/" element={<TaskHome tasks={tasks} setTasks={setTasks}/>}/>
                    <Route path="/add-task" element={<AddTask addTask={addTask}/>}/>
                    <Route path="/:id/details" element={<TaskDetails tasks={tasks}/>}/>
                    <Route path="/:id/edit" element={<EditTask tasks={tasks} updateTask={updateTask}/>}/>
                </Routes>
            </Router>
        </div>
    )

}

export default App