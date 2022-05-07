import React, {useState, useEffect, useCallback} from "react"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TaskHome from "./TaskHome"
import TaskDetails from "./TaskDetails"
import EditTask from "./EditTask";
import AddTask from "./AddTask";

const App = () => {
    const [nextId, setNextId] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasFetchedFirst, setHasFetchedFirst] = useState(false)

    useEffect(() => {
        const items = window.localStorage.getItem('myTask')
        if (items && items.length) {
            const stringifyToParse = JSON.parse(items)
            setTasks(stringifyToParse)
            setNextId(Math.max(stringifyToParse.map(item => item.id)) + 1)
        } else {
            if (!hasFetchedFirst) {
                setHasFetchedFirst(true)
                setHasError(false)
                setIsFetching(true)
                fetch('https://jsonplaceholder.typicode.com/users/1/posts')
                    .then(res => res.json())
                    .then(newTasks => {
                        setIsFetching(false)
                        let tasks = []
                        let nextId
                        newTasks.map(task => {
                            tasks.push({
                                    id: task.id,
                                    label: task.title,
                                    description: task.body,
                                    isDone: false,
                            })
                            nextId = task.id
                        })
                        setTasks(tasks)
                        setNextId((nextId + 1))
                    })
                    .catch(() => setHasError(true))
            }
        }
    }, [])

    useEffect( () => {
        console.log(tasks)
        window.localStorage.setItem('myTask', JSON.stringify(tasks))
        console.log(tasks)
    }, [tasks])


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
                    <Route path="/" element={<TaskHome tasks={tasks} setTaskStatus={setTaskStatus} setTasks={setTasks}/>}/>
                    <Route path="/add-task" element={<AddTask addTask={addTask}/>}/>
                    <Route path="/details/:id" element={<TaskDetails tasks={tasks}/>}/>
                    <Route path="/edit/:id" element={<EditTask tasks={tasks} updateTask={updateTask}/>}/>
                </Routes>
            </Router>
        </div>
    )

}

export default App