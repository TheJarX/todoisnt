import React, { useEffect, useState } from "react";
import logo from "./images/todoisnt-logo.png";
import plus from "./images/icons/plus.svg";
import trash from "./images/icons/trash.svg";
import TaskForm from "./components/TaskForm";
import TasksList from "./components/TaskList";
import "./App.css";

const getTasks = () => JSON.parse(window.localStorage.getItem("tasks")) || {};

// noinspection CommaExpressionJS
const filter = (obj, predicate) =>
  Object.keys(obj)
    .filter((key) => predicate(obj[key]))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

function App() {
  const [tasks, setTasks] = useState(() => getTasks());
  const [taskFormVisible, setTaskFormVisible] = useState(false);
  const [completedTasksVisible, setCompletedTasksVisible] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filterCompleted = (task) => task.isCompleted;
  const filterUncompleted = (task) => !task.isCompleted;

  const addTask = (task) => {
    setTasks({ ...tasks, [task.id]: task });
  };

  const modifyTask = (newTask) => {
    const newTasks = { ...tasks };
    newTasks[newTask.id] = newTask;
    setTasks(newTasks);
  };

  const onClickCheckbox = (task) => {
    modifyTask(task);
  };

  const onCancelForm = () => {
    setTaskFormVisible(false);
  };

  const showTaskForm = () => {
    setTaskFormVisible(true);
  };

  const onDelete = (taskId) => {
    const newTasks = { ...tasks };
    delete newTasks[taskId];
    setTasks(newTasks);
  };

  const clearCompletedTasks = () => {
    const newTasks = filter(tasks, filterUncompleted);
    setTasks(newTasks);
  };

  const toggleDarkMode = (e) => {
    document.body.classList.toggle("dark");
  };

  return (
    <>
      <img src={logo} className="logo" alt="logo" />
      <button className="btn-dark-mode" onClick={toggleDarkMode}>
        Toggle dark mode
      </button>
      <main id="main">
        <div id="app">
          <div className="app__header">
            <h3>Todos</h3>
          </div>
          <div className="app__body">
            <div className="app__body__todos">
              <TasksList
                tasks={filter(tasks, filterUncompleted)}
                onCheck={onClickCheckbox}
                onUpdate={modifyTask}
                onDelete={onDelete}
              />
            </div>
            <div id="add_task_trigger">
              <TaskForm
                taskAction={addTask}
                update={false}
                onCancelForm={onCancelForm}
                visible={taskFormVisible}
              />
              <button
                className={`btn trigger ${taskFormVisible && "hide-form"}`}
                onClick={showTaskForm}
              >
                <img src={plus} alt="plus" /> Add task
              </button>
            </div>

            <div id="show_completed_trigger">
              <button
                className="btn trigger"
                onClick={() => {
                  setCompletedTasksVisible(!completedTasksVisible);
                }}
              >
                {completedTasksVisible ? "Hide" : "Show"} completed tasks
              </button>
            </div>
            <div
              id="app__body__completed-todos"
              className={completedTasksVisible ? "" : "hide-form"}
            >
              <TasksList
                tasks={filter(tasks, filterCompleted)}
                onCheck={onClickCheckbox}
              />
              <button
                className={`btn trigger btn-clear-tasks`}
                onClick={() => clearCompletedTasks()}
              >
                <img src={trash} alt="" />
                Clear completed tasks
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
