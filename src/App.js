import React, {useEffect, useState} from "react";
import logo from "./images/todoisnt-logo.png";
import plus from './images/icons/plus.svg'
import TaskForm from "./components/TaskForm";
import TasksList from "./components/TaskList";
import "./App.css";

const getTasks = () => JSON.parse(window.localStorage.getItem('tasks')) || [];
const consoleStyle = "font-size: 24px; color: red";

function App() {
    const [tasks, setTasks] = useState(() => getTasks());

   useEffect(() => {
       window.localStorage.setItem('tasks', JSON.stringify(tasks))
   }, [tasks]);

    const addTask = (task) => {
        setTasks([task, ...tasks]);
    };

    // const tasks = [{body: 'Code a grayscale chrome extension', isCompleted: false}]//getTasks();
    return (
        <>
            <img src={logo} className="logo" alt="logo"/>
            <main id="main">
                <div id="app">
                    <div className="app__header">
                        <h3>Todos</h3>
                    </div>
                    <div className="app__body">
                        <div className="app__body__todos">
                            {/*
                            ! FORM
                            */}
                            <TaskForm addTask={addTask} update={false}/>
                        </div>
                        <TasksList tasks={tasks}/>
                        <div id="add_task_trigger">
                            <button className="btn trigger">
                                <img src={plus} alt="plus"/> Add task
                            </button>
                        </div>


                        <div id="app__body__completed-todos">
                            <div id="show_completed_trigger">
                                <button className="btn trigger">
                                    Show completed
                                </button>
                            </div>
                            <p>ASD</p>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
