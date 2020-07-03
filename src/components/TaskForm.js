import trash from "../images/icons/trash.svg";
import React, {useState} from "react";
import ID from "../idGenerator";

function TaskForm({taskAction, onCancelForm, visible = false, update = false}) {
    const [task, setTask] = useState({
        id: "",
        body: "",
        isCompleted: false
    });

    const handleTaskInputChange = e => {
        setTask({...task, body: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (task.body.trim().length < 3) return;
        taskAction({...task, id: ID()});
        setTask({...task, body: ""});
    };

    return (
        <form className={`add-task-form ${!visible&& 'hide-form'}`} onSubmit={handleSubmit}>
            <input type="text" name="task" onChange={handleTaskInputChange} className="task-title"
                   placeholder="Write a todo" value={task.body}/>
            <div className="add-task-form__footer">
                <div className="add-task-form__buttons">
                    <button className="btn-dark"> {update ? 'Update' : 'Add'} </button>
                    <button className="btn" type="button" onClick={onCancelForm}>Cancel</button>
                </div>
                {update &&
                <div className="add-task-form__right-buttons">
                    <button className="btn">
                        <img src={trash} alt="delete"/>
                    </button>
                </div>
                }
            </div>
        </form>
    );
}

export default TaskForm;