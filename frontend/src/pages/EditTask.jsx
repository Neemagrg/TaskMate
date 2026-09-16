import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";
import api from "../api/api";

function EditTask() {

    const { id } = useParams();

    const navigate = useNavigate();

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

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");

    useEffect(() => {

        loadTask();

    }, [id]);

    const loadTask = async () => {

        try {

            const response =
                await api.get(
                    `/tasks/${id}`
                );

            const task =
                response.data.task;

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

        } catch (error) {

            console.error(error);

            setError(
                "Task not found or you do not have permission to edit it."
            );

        } finally {

            setLoading(false);

        }
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            setSaving(true);

            await api.put(
                `/tasks/${id}`,
                form
            );

            navigate("/tasks");

        } catch (error) {

            console.error(error);

            if (
                error.response?.data?.errors
            ) {

                const errors =
                    error.response.data.errors;

                const firstError =
                    Object.values(errors)[0]?.[0];

                setError(
                    firstError ||
                    "Unable to update task."
                );

            } else {

                setError(
                    "Unable to update task."
                );

            }

        } finally {

            setSaving(false);

        }
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

    if (error && !form.title) {

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

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

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
                            disabled={saving}
                        >
                            {saving
                                ? "Updating..."
                                : "Update Task"}
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