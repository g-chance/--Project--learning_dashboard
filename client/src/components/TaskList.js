import React, { useEffect, useState } from 'react'
import { Link, navigate } from '@reach/router'
import axios from 'axios'

const TaskList = (props) => {
    
    const [tasks, setTasks] = useState(
        {}
    )
    const [refresher, setRefresher] = useState(true)

    let userID = localStorage.getItem('userID')

    useEffect(() => {
        console.log("you are in TaskList.js")
        console.log(userID)
        axios.get(`http://localhost:8000/api/v1/findOne/${userID}`)
        .then((res) => {
            setTasks(res.data.tasks)
            console.log(res.data.tasks)
        })
        .catch((err) => console.log(err))
    }, [refresher])

    const completeTask = (e, idx, task, val) => {
        let updateTask = {...task}
        updateTask.status = val
        console.log(updateTask)
        console.log(tasks[idx])
        console.log("tasks", tasks)
        setTasks(
            [...tasks, tasks[idx] = updateTask]
        )
        axios.put(`http://localhost:8000/api/v1/updateOne/${userID}`, {
            tasks: tasks
        })
        .then((res) => {
            console.log(res)
            setRefresher(!refresher)
        })
        .catch((err) => console.log(err))
    }

    const deleteTask = (e, idx, task) => {
        setTasks(
            [...tasks, tasks[idx] = null]
        )
        axios.put(`http://localhost:8000/api/v1/updateOne/${userID}`, {
            tasks: tasks
        })
        .then((res) => {
            console.log(res)
            setRefresher(!refresher)
        })
        .catch((err) => console.log(err))
    }

    const formatTime = (time) => {
        if (time >= 3600) {
            let hours = Math.floor(time / 3600);
            if (hours < 10) {
                hours = `0${hours}`;
            }
            let minutes = Math.floor(time / 60) - hours * 60;
            if (minutes < 10) {
                minutes = `0${minutes}`;
            }
            let seconds = time - (hours * 3600 + minutes * 60);
            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            return `${hours}h ${minutes}m ${seconds}s`;
        } 
        else if (time === 0){
            return `None`
        }
        else {
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;

            if (seconds < 10) {
                seconds = `0${seconds}`;
            }

            return `${minutes}m ${seconds}s`;
        }
    };
    
    const startTimer = (e,i) => {
        navigate(`/timer/select/${i}`)
    }
    
    const editTask = (e,i)=> {
        navigate(`/tasks/edit/${i}`)
    }
    return (
        <div className="taskList">
            <Link className="newtaskLink" to="/tasks/new">
                <button className="newtask">New Task</button>
            </Link>
            <div className ="col">
                {/* Overdue tasks will only show if there are overdue tasks */}
                {tasks[0] && tasks.filter((task, i) => task!== null && task.dueDate && task.status === 0).length !== 0 &&
                <h1>Overdue Tasks</h1>
                }
                {tasks[0] && tasks.map((task, i) => (
                task!== null && task.dueDate && task.status !== 1 &&
                new Date(task.dueDate).getTime() <= Date.now() &&
                <div key={i} className="task">
                    <h2><Link to={`/tasks/notes/${i}/new`}>{task.title}</Link></h2>
                    <p className="desc">{task.description}</p>
                    {/* <p className="deets"><span>Start Date:</span> {task.startDate}</p> */}

                    <p className="deets"><span>Due Date:</span> {task.dueDate ? task.dueDate.substring(0, 10) : ''}</p>
                    <p className="deets"><span>Time Spent:</span> {formatTime(task.timeSpent)}</p>

                    <div className="buttons">
                        <button onClick={(e) => completeTask(e, i, task,1)}>Complete</button>
                        <button onClick={(e)=>editTask(e,i)}>Edit</button>
                        <button onClick={(e)=>startTimer(e,i)}>Timer</button>
                    </div>
                </div>
                ))}
                {/* Tasks whose Start Date is today or earlier */}
                <h1>Active Tasks</h1>
                {tasks[0] && tasks.map((task, i) => (
                task!== null && (new Date(task.startDate).getTime() <= Date.now() && (new Date(task.dueDate).getTime() >= Date.now() || !task.dueDate) && task.status !== 1) &&
                <div key={i} className="task">
                    <h2><Link to={`/tasks/notes/${i}/new`}>{task.title}</Link></h2>
                    <p className="desc">{task.description}</p>
                    {/* <p className="deets"><span>Start Date:</span> {task.startDate}</p> */}

                    <p className="deets"><span>Due Date:</span> {task.dueDate ? task.dueDate.substring(0, 10) : ''}</p>
                    <p className="deets"><span>Time Spent:</span> {formatTime(task.timeSpent)}</p>

                    <div className="buttons">
                        <button onClick={(e) => completeTask(e, i, task,1)}>Complete</button>
                        <button onClick={(e)=>editTask(e,i)}>Edit</button>
                        <button onClick={(e)=>startTimer(e,i)}>Timer</button>
                    </div>
                </div>
                ))}
            </div>
            <div className ="col">
                {/* Tasks whose start day is tomorrow or later */}
                <h1>Future Tasks</h1>
                {tasks[0] && tasks.map((task, i) => (
                task!== null && new Date(task.startDate).getTime() > Date.now() &&
                <div key={i} className="task">
                    <h2><Link to={`/tasks/notes/${i}/new`}>{task.title}</Link></h2>
                    <p className="desc">{task.description}</p>
                    <p className="deets"><span>Start Date:</span>{task.startDate ? task.startDate.substring(0, 10) : ''}</p>
                    {task.dueDate &&
                    <p className="deets"><span>Due Date:</span> {task.dueDate ? task.dueDate.substring(0, 10) : ''}</p>
                    }
                    <div className="buttons">
                    <button onClick={(e)=>editTask(e,i)}>Edit</button>
                    <button onClick={(e)=>startTimer(e,i)}>Timer</button>
                    </div>
                    {/* <p className="deets"><span>Time Spent:</span> {task.timeSpent}</p> */}
                </div>
                ))}
            </div>
            <div className ="col">
                <h1>Completed Tasks</h1>
                {tasks[0] && tasks.map((task, i) => (
                task!== null && task.status === 1 &&
                <div key={i} className="task">
                    <h2><Link to={`/tasks/notes/${i}/new`}>{task.title}</Link></h2>
                    <p className="desc">{task.description}</p>
                    {/* <p className="deets"><span>Start Date:</span> {task.startDate}</p> */}
                    {<p className="deets"><span>Due Date:</span> {task.dueDate ? task.dueDate.substring(0, 10) : ''}</p>}
                    <p className="deets"><span>Time Spent:</span> {formatTime(task.timeSpent)}</p>
                    <div className="buttons">
                        <button onClick={(e) => completeTask(e, i, task,0)}>Move to Active</button>
                        <button onClick={(e) => deleteTask(e, i, task)}>Delete</button>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default TaskList
