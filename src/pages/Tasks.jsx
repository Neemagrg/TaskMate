import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Tasks() {

    const [tasks, setTasks] = useState([]);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {

        const allTasks =
            JSON.parse(localStorage.getItem("tasks")) || [];

        const userTasks = allTasks.filter(
            (task) => task.userId === user?.id
        );

        setTasks(userTasks);
    };

    const deleteTask = (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this task?"
            );

        if (!confirmDelete) {
            return;
        }

        const allTasks =
            JSON.parse(localStorage.getItem("tasks")) || [];

        const updatedTasks = allTasks.filter(
            (task) => task.id !== id
        );

        localStorage.setItem(
            "tasks",
            JSON.stringify(updatedTasks)
        );

        loadTasks();
    };

    const filteredTasks = tasks.filter((task) => {

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

            {/* Search and Filter */}

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

            {/* Task List */}

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

                    {filteredTasks.map((task) => (

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
                                    .replace(" ", "-")}`}
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

                    ))}

                </div>

            )}

        </div>
    );
}

export default Tasks;