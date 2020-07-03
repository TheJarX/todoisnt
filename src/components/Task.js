import checkedCheckbox from "../images/icons/checkbox-checked.svg";
import checkbox from "../images/icons/checkbox.svg";
import React from "react";

function Task({task}) {
    return (
        <div className="task">
            <div className="task__checkbox"><img src={task.isCompleted ? checkedCheckbox : checkbox} alt=""/></div>
            <p>{task.body}</p>
        </div>
    );
}

export default Task;