import trash from "../images/icons/trash.svg";
import React, {useState} from "react";
import ID from "../idGenerator";

function TaskForm({addTask, update = false}) {
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
        e.preventDefault();
        addTask({...task, id: ID()});
        setTask({...task, body: ''});
        e.target.elements[0].value = ''
    };

    return (
        <form className="add-task-form" onSubmit={handleSubmit}>
            <input type="text" name="task" onChange={handleTaskInputChange} className="task-title"
                   placeholder={"Todo text"}/>
            <div className="add-task-form__footer">
                <div className="add-task-form__buttons">
                    <button className="btn-dark"> {update ? 'Update' : 'Add'} </button>
                    <button className="btn" type="button">Cancel</button>
                </div>
                {update &&
                <div className="add-task-form__right-buttons">
                    <button className="btn">
                        <img src={trash} alt="trash"/>
                    </button>
                </div>
                }
            </div>
        </form>
    );
}

export default TaskForm;