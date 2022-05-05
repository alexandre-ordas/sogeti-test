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
        (taskInfos) => {
            const newTask = {id: nextId, ...taskInfos}
            setNextId(nextId + 1)
            setTasks([ newTask, ...tasks])
        },
        [nextId, tasks],
    )

    const updateTask = useCallback(
        (taskInfos) => {
            const taskIndex = tasks.findIndex(t => t.id === taskInfos.id)
            const tasksBefore = tasks.slice(0, taskIndex)
            const tasksAfter = tasks.slice(taskIndex + 1)
            setTasks([...tasksBefore, taskInfos, ...tasksAfter])
        },
        [tasks],
    )

    useEffect(() => {
        if (!hasFetchedFirst) {
            setHasFetchedFirst(true)
            setHasError(false)
            setIsFetching(true)
            fetch('https://jsonplaceholder.typicode.com/users/1/posts')
                .then(res => res.json())
                .then(newTasks => {
                    setIsFetching(false)
                    setTasks(
                        newTasks.map(task => ({
                            id: task.id,
                            label: task.title,
                            description: task.body,
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
                    <Route path="/details/:id" element={<TaskDetails tasks={tasks}/>}/>
                    <Route path="/edit/:id" element={<EditTask tasks={tasks} updateTask={updateTask}/>}/>
                </Routes>
            </Router>
        </div>
    )

}

export default App