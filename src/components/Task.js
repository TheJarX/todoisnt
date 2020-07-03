import checkedCheckbox from "../images/icons/checkbox-checked.svg";
import checkbox from "../images/icons/checkbox.svg";
import React from "react";
import TaskForm from "./TaskForm";

function Task({task, onCheck, onClick}) {

    let checkboxIcon = task.isCompleted ? checkedCheckbox : checkbox;
    const status = task.isCompleted ? 'completed' : 'uncompleted';

    const onHover = e => {
        if (task.isCompleted) return null;

        let src = ''
        if (e.target.tagName !== 'IMG') return null;
        if (e.type === 'mouseenter') {
            src = checkedCheckbox;
        } else if (e.type === 'mouseleave') {
            src = checkbox;
        }

        e.target.src = src.toString();
    }

    return (
        <div className={`task ${status}`}>
            <div className="task__content">
                <div className="task__checkbox">
                    <img src={checkboxIcon} alt={status} onMouseEnter={onHover} onMouseLeave={onHover}
                         onClick={() => onCheck({...task, isCompleted: !task.isCompleted})}/>
                </div>
                <p>{task.body}</p>
            </div>
            {!task.isCompleted &&
            <div className="task__update-form">
                <TaskForm taskAction={function(){}} update={true}/>
            </div>
            }
        </div>
    );
}

export default Task;