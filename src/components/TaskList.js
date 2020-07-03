import React from "react";
import Task from "./Task";

function TasksList({tasks}) {
    return tasks.map(task => <Task key={task.id} id={task.id} task={task}/>);
}

export default  TasksList;