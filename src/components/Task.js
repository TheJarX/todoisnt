import checkedCheckbox from "../images/icons/checkbox-checked.svg";
import checkbox from "../images/icons/checkbox.svg";
import React, {useState} from "react";
import TaskForm from "./TaskForm";

function Task({task, onCheck, onUpdate, onDelete}) {

    const [visible, setVisible] = useState(false);

    const checkboxIcon = task.isCompleted ? checkedCheckbox : checkbox;
    const status = task.isCompleted ? 'completed' : 'uncompleted';

    const onHover = e => {
        if (task.isCompleted) return;

        let src = ''
        if (e.target.tagName !== 'IMG') return;
        if (e.type === 'mouseenter') {
            src = checkedCheckbox;
        } else if (e.type === 'mouseleave') {
            src = checkbox;
        }

        e.target.src = src.toString();
    }

    const editTask = e => {
        if (e.target.tagName === 'IMG') return;
        setVisible(true);
    };

    const cancelEditTask = () => {
        setVisible(false);
    };

    const updateTask = task => {
        onUpdate(task);
        cancelEditTask();
    };


    return (
        <div className={`task ${status}`}>
            <div className={`task__content ${visible && 'hide-form'}`} onClick={!task.isCompleted ? editTask : () => {}}>
                <div className="task__checkbox">
                    <img src={checkboxIcon} alt={status} onMouseEnter={onHover} onMouseLeave={onHover}
                         onClick={() => onCheck({...task, isCompleted: !task.isCompleted})}/>
                </div>
                <p>{task.body}</p>
            </div>
            <div className="task__update-form">
                <TaskForm onDelete={() => onDelete(task.id)} taskAction={updateTask} onCancelForm={cancelEditTask}
                          update={true} visible={visible} oldTask={task}/>
            </div>
        </div>
    );
}

export default Task;