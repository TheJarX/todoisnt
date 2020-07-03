import React from "react";
import Task from "./Task";

function TasksList({tasks, onCheck, onUpdate, onDelete}) {
    return Object.keys(tasks).map(id => {
        return <Task key={id} id={id} task={tasks[id]} onCheck={onCheck} onUpdate={onUpdate} onDelete={onDelete}/>
    });
}

export default  TasksList;