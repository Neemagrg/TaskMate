import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("currentUser")
    );

    const logout = () => {

        localStorage.removeItem("currentUser");

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="nav-container">

                <Link to="/" className="logo"> Task Manager </Link>

                <div className="nav-links">

                    <Link to="/"> Dashboard </Link>

                    <Link to="/tasks"> Tasks </Link>

                    <Link to="/tasks/add"> Add Task </Link>

                    <span className="username"> {user?.name} </span>

                    <button
                        onClick={logout}
                        className="logout-btn">
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;