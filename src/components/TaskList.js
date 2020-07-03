import React from "react";
import Task from "./Task";

function TasksList({tasks}) {
    console.log(tasks)
    return Object.keys(tasks).map(id => <Task key={id} id={id} task={tasks[id]}/> );
}

export default  TasksList;