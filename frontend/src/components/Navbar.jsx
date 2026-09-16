import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const logout = async () => {

        try {
            await api.post("/logout");
        } catch (error) {
            console.log("Logout error:", error);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="nav-container">

                <Link
                    to="/"
                    className="logo"
                >
                    Task Manager
                </Link>

                <div className="nav-links">

                    <Link to="/">
                        Dashboard
                    </Link>

                    <Link to="/tasks">
                        Tasks
                    </Link>

                    <Link to="/tasks/add">
                        Add Task
                    </Link>

                    <span className="username">
                        {user?.name}
                    </span>

                    <button
                        onClick={logout}
                        className="logout-btn"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;