import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function Dashboard() {

    const [tasks, setTasks] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );

    useEffect(() => {

        loadTasks();

    }, []);

    const loadTasks = async () => {

        try {

            const response =
                await api.get("/tasks");

            setTasks(
                response.data.tasks
            );

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load dashboard data."
            );

        } finally {

            setLoading(false);

        }
    };

    const totalTasks =
        tasks.length;

    const completedTasks =
        tasks.filter(
            (task) =>
                task.status === "Completed"
        ).length;

    const pendingTasks =
        tasks.filter(
            (task) =>
                task.status === "Pending"
        ).length;

    const inProgressTasks =
        tasks.filter(
            (task) =>
                task.status === "In Progress"
        ).length;

    if (loading) {

        return (
            <div className="page-container">
                <h2>
                    Loading dashboard...
                </h2>
            </div>
        );
    }

    return (
        <div className="page-container">

            <div className="page-header">

                <div>

                    <h1>
                        Welcome, {user?.name}
                    </h1>

                    <p>
                        Here's your task overview.
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

            <div className="stats">

                <div className="stat-card total-card">

                    <h3>
                        Total Tasks
                    </h3>

                    <strong>
                        {totalTasks}
                    </strong>

                </div>

                <div className="stat-card completed-card">

                    <h3>
                        Completed
                    </h3>

                    <strong>
                        {completedTasks}
                    </strong>

                </div>

                <div className="stat-card pending-card">

                    <h3>
                        Pending
                    </h3>

                    <strong>
                        {pendingTasks}
                    </strong>

                </div>

                <div className="stat-card progress-card">

                    <h3>
                        In Progress
                    </h3>

                    <strong>
                        {inProgressTasks}
                    </strong>

                </div>

            </div>

            <div className="dashboard-section">

                <div className="section-header">

                    <h2>
                        Recent Tasks
                    </h2>

                    <Link to="/tasks">
                        View All
                    </Link>

                </div>

                {tasks.length === 0 ? (

                    <div className="empty">

                        <p>
                            You don't have any tasks yet.
                        </p>

                        <br />

                        <Link
                            to="/tasks/add"
                            className="primary-btn"
                        >
                            Create Your First Task
                        </Link>

                    </div>

                ) : (

                    <div className="task-list">

                        {tasks
                            .slice(0, 5)
                            .map((task) => (

                                <div
                                    className="task-row"
                                    key={task.id}
                                >

                                    <div>

                                        <h3>
                                            {task.title}
                                        </h3>

                                        <p>
                                            {task.description ||
                                                "No description"}
                                        </p>

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

                                </div>

                            ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Dashboard;