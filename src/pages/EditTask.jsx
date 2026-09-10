import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

function EditTask() {

    const { id } = useParams();

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

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        const allTasks =
            JSON.parse(
                localStorage.getItem("tasks")
            ) || [];

        const task = allTasks.find(
            (task) =>
                task.id === Number(id) &&
                task.userId === user?.id
        );

        if (!task) {

            setError("Task not found.");

            setLoading(false);

            return;
        }

        setForm({
            title: task.title || "",
            description:
                task.description || "",
            category:
                task.category || "",
            priority:
                task.priority || "Low",
            status:
                task.status || "Pending",
            due_date:
                task.due_date || "",
        });

        setLoading(false);

    }, [id]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const allTasks =
            JSON.parse(
                localStorage.getItem("tasks")
            ) || [];

        const updatedTasks =
            allTasks.map((task) => {

                if (
                    task.id === Number(id) &&
                    task.userId === user.id
                ) {

                    return {
                        ...task,
                        ...form,
                    };

                }

                return task;

            });

        localStorage.setItem(
            "tasks",
            JSON.stringify(updatedTasks)
        );

        navigate("/tasks");
    };

    if (loading) {

        return (
            <div className="page-container">

                <h2>
                    Loading task...
                </h2>

            </div>
        );
    }

    if (error) {

        return (
            <div className="page-container">

                <div className="error">
                    {error}
                </div>

            </div>
        );
    }

    return (
        <div className="page-container">

            <div className="form-container">

                <h1>
                    Edit Task
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="task-form"
                >

                    <label>
                        Task Title
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />

                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows="5"
                    />

                    <label>
                        Category
                    </label>

                    <input
                        type="text"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    />

                    <label>
                        Priority
                    </label>

                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                    >

                        <option value="Low">
                            Low
                        </option>

                        <option value="Medium">
                            Medium
                        </option>

                        <option value="High">
                            High
                        </option>

                    </select>

                    <label>
                        Status
                    </label>

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                    </select>

                    <label>
                        Due Date
                    </label>

                    <input
                        type="date"
                        name="due_date"
                        value={form.due_date}
                        onChange={handleChange}
                    />

                    <div className="form-buttons">

                        <button
                            type="submit"
                            className="primary-btn"
                        >
                            Update Task
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

export default EditTask;