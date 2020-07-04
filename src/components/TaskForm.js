import trash from "../images/icons/trash.svg";
import React, {useState} from "react";
import ID from "../idGenerator";

function TaskForm({taskAction, onCancelForm, onDelete, oldTask = false, visible = false, update = false}) {

    const [task, setTask] = useState(() => oldTask || { id: "", body: "", isCompleted: false } );
    const [wrongLength, setWrongLength] = useState(false);

    const handleTaskInputChange = e => {
        setTask({...task, body: e.target.value});
        if(wrongLength) setWrongLength(task.body.trim().length < 2);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (task.body.trim().length < 3) return setWrongLength(true);

        setWrongLength(false);
        const newTask = update ? task : {...task, id: ID()};
        taskAction(newTask);
        setTask({...task, body: ""});
    };

    const cancelForm = e => {
        onCancelForm(e);
        setWrongLength(false);
    };

    return (
        <form className={`add-task-form ${!visible && 'hide-form'}`} onSubmit={handleSubmit}>
            <input type="text" name="task" onChange={handleTaskInputChange} className="task-title"
                   placeholder="Write a todo" value={task.body}/>
                   <p className={`length-msg ${!wrongLength&&'hide-form'}`}>The task should be at least 3 characters long</p>
            <div className="add-task-form__footer">
                <div className="add-task-form__buttons">
                    <button className="btn-dark"> {update ? 'Update' : 'Add'} </button>
                    <button className="btn" type="button" onClick={cancelForm}>Cancel</button>
                </div>
                {update &&
                <div className="add-task-form__right-buttons">
                    <button className="btn" onClick={() => onDelete(task)} type={"button"}>
                        <img src={trash} alt="delete"/>
                    </button>
                </div>
                }
            </div>
        </form>
    );
}

export default TaskForm;