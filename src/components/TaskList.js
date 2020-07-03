import React from "react";
import Task from "./Task";

function TasksList({tasks, onCheck}) {
    return Object.keys(tasks).map(id => <Task key={id} id={id} task={tasks[id]} onCheck={onCheck}/> );
}

export default  TasksList;