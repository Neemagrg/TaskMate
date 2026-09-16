```jsx
import { NavLink, Link, useNavigate } from "react-router-dom";
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

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "active-nav" : ""
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/tasks"
                        className={({ isActive }) =>
                            isActive ? "active-nav" : ""
                        }
                    >
                        Tasks
                    </NavLink>

                    <NavLink
                        to="/tasks/add"
                        className={({ isActive }) =>
                            isActive ? "active-nav" : ""
                        }
                    >
                        Add Task
                    </NavLink>

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
```
