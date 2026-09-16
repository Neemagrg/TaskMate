import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function Tasks() {

    const [tasks, setTasks] = useState([]);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {

        try {

            setLoading(true);

            const response =
                await api.get("/tasks");

            setTasks(
                response.data.tasks
            );

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load tasks."
            );

        } finally {

            setLoading(false);

        }
    };

    const deleteTask = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this task?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/tasks/${id}`
            );

            setTasks(
                tasks.filter(
                    (task) => task.id !== id
                )
            );

        } catch (error) {

            console.error(error);

            alert(
                "Unable to delete task."
            );

        }
    };

    const filteredTasks =
        tasks.filter((task) => {

            const matchesSearch =
                task.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    );

            const matchesStatus =
                statusFilter === "All" ||
                task.status === statusFilter;

            return (
                matchesSearch &&
                matchesStatus
            );
        });

    if (loading) {

        return (
            <div className="page-container">
                <h2>Loading tasks...</h2>
            </div>
        );

    }

    return (
        <div className="page-container">

            <div className="page-header">

                <div>

                    <h1>
                        My Tasks
                    </h1>

                    <p>
                        Manage all your tasks.
                    </p>

                </div>

                <Link
                    to="/tasks/add"
                    className="primary-btn"
                >
                    + Add Task
                </Link>

            </div>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            <div className="filters">

                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(
                            e.target.value
                        )
                    }
                >

                    <option value="All">
                        All Tasks
                    </option>

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

            </div>

            {filteredTasks.length === 0 ? (

                <div className="empty">

                    <h3>
                        No tasks found
                    </h3>

                    <p>
                        Try creating a new task.
                    </p>

                </div>

            ) : (

                <div className="task-grid">

                    {filteredTasks.map(
                        (task) => (

                            <div
                                className="task-card"
                                key={task.id}
                            >

                                <div className="task-card-header">

                                    <h2>
                                        {task.title}
                                    </h2>

                                    <span
                                        className={`priority ${task.priority.toLowerCase()}`}
                                    >
                                        {task.priority}
                                    </span>

                                </div>

                                <p className="description">

                                    {task.description ||
                                        "No description"}

                                </p>

                                <div className="task-info">

                                    <span>
                                        Category:{" "}
                                        {task.category ||
                                            "None"}
                                    </span>

                                    <span>
                                        Due:{" "}
                                        {task.due_date ||
                                            "No date"}
                                    </span>

                                </div>

                                <span
                                    className={`status ${task.status
                                        .toLowerCase()
                                        .replace(
                                            " ",
                                            "-"
                                        )}`}
                                >
                                    {task.status}
                                </span>

                                <div className="task-actions">

                                    <Link
                                        to={`/tasks/edit/${task.id}`}
                                        className="edit-btn"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() =>
                                            deleteTask(
                                                task.id
                                            )
                                        }
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}

export default Tasks;