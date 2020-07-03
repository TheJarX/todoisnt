import React, {useEffect, useState} from "react";
import logo from "./images/todoisnt-logo.png";
import plus from './images/icons/plus.svg'
import trash from './images/icons/trash.svg'
import checkbox from './images/icons/checkbox.svg'
import checkedCheckbox from './images/icons/checkbox-checked.svg'
import "./App.css";

const consoleStyle = "font-size: 24px; color: red";

const getTasks = () => JSON.parse(window.localStorage.getItem('tasks')) || [];

const saveTask = task => {
    const tasks = getTasks();
    tasks.push(task);
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
};

const deleteTask = id => {
    return 0;
};

function TaskElement({task}) {
    return (
        <div className="task">
            <div className="task__checkbox"><img src={task.isCompleted ? checkedCheckbox : checkbox} alt=""/></div>
            <p>{task.body}</p>
        </div>
    );
}


function TasksList({tasks}) {
    return tasks.map((task, idx) => <TaskElement key={idx} id={idx} task={task}/>);
}

function App() {
    const [tasks, setTasks] = useState(() => getTasks());

    function TaskForm({task = null}) {

        const closeForm = e => {
            console.log('Closing...', e.target)
        };

        const submitTask = task => {
            if (task.body.length < 3) return;
            saveTask(task);
            setTasks(getTasks());
        };

        const handleSubmit = e => {
            e.preventDefault();
            const body = e.target.elements[0].value;
            submitTask({body, isCompleted: false});
            e.target.elements[0].value = '';
        };

        return (
            <form className="add-task-form" onSubmit={handleSubmit}>
                <input type="text" name="task" className="task-title"
                       placeholder={"Todo text"}/>
                <div className="add-task-form__footer">
                    <div className="add-task-form__buttons">
                        <button className="btn-dark"> {task ? 'Update' : 'Add'} </button>
                        <button className="btn" onClick={closeForm} type="button">Cancel</button>
                    </div>
                    {task &&
                    <div className="add-task-form__right-buttons">
                        <button className="btn">
                            <img src={trash} alt="trash"/>
                        </button>
                    </div>
                    }
                </div>
            </form>
        );
    }

    console.log('RENDERING')

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
                            <TaskForm/>
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
