import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTask() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const [form, setForm] = useState({
        title: "",
        description: "",
        category: "",
        priority: "Low",
        status: "Pending",
        due_date: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        setError("");

        if (!form.title.trim()) {
            setError("Please enter a task title.");
            return;
        }

        const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];

        const newTask = {
            id: Date.now(),
            userId: user.id,
            title: form.title,
            description: form.description,
            category: form.category,
            priority: form.priority,
            status: form.status,
            due_date: form.due_date,
            createdAt: new Date().toISOString(),
        };

        allTasks.push(newTask);

        localStorage.setItem( "tasks", JSON.stringify(allTasks) );

        navigate("/tasks");
    };

    return (
        <div className="page-container">

            <div className="form-container">

                <h1> Add New Task </h1>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="task-form"
                >

                    <label> Task Title </label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Enter task title"
                        required
                    />

                    <label> Description </label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe your task"
                        rows="5"
                    />

                    <label> Category </label>
                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        placeholder="e.g. Study, Work, Personal"
                    />

                    <label> Priority </label>
                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                    >
                        <option value="Low"> Low </option>
                        <option value="Medium"> Medium </option>
                        <option value="High"> High </option>
                    </select>

                    <label> Status </label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="Pending"> Pending </option>
                        <option value="In Progress"> In Progress </option>
                        <option value="Completed"> Completed </option>
                    </select>

                    <label> Due Date </label>
                    <input
                        type="date"
                        name="due_date"
                        value={form.due_date}
                        onChange={handleChange}
                    />

                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="primary-btn">
                            Create Task
                        </button>

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() =>
                                navigate("/tasks")
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddTask;