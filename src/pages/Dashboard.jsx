import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = () => {

        const allTasks =
            JSON.parse(localStorage.getItem("tasks")) || [];

        // Only show this user's tasks
        const userTasks = allTasks.filter(
            (task) => task.userId === user?.id
        );

        setTasks(userTasks);
    };

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        (task) => task.status === "Completed"
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === "Pending"
    ).length;

    const inProgressTasks = tasks.filter(
        (task) => task.status === "In Progress"
    ).length;

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

            {/* Statistics */}

            <div className="stats">

    <div className="stat-card total-card">
        <h3>Total Tasks</h3>

        <strong>
            {totalTasks}
        </strong>
    </div>

    <div className="stat-card completed-card">
        <h3>Completed</h3>

        <strong>
            {completedTasks}
        </strong>
    </div>

    <div className="stat-card pending-card">
        <h3>Pending</h3>

        <strong>
            {pendingTasks}
        </strong>
    </div>

    <div className="stat-card progress-card">
        <h3>In Progress</h3>

        <strong>
            {inProgressTasks}
        </strong>
    </div>

</div>

            {/* Recent Tasks */}

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
                            .slice(-5)
                            .reverse()
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
                                            .replace(" ", "-")}`}
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