import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
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

        // Get registered users
        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        // Find matching user
        const user = users.find(
            (user) =>
                user.email.toLowerCase() ===
                    form.email.toLowerCase() &&
                user.password === form.password
        );

        if (!user) {
            setError("Incorrect email or password.");
            return;
        }

        // Save logged-in user
        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        // Create a simple login token
        localStorage.setItem(
            "token",
            "logged-in"
        );

        // Go to dashboard
        navigate("/");
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Task Manager</h1>

                <h2>Login</h2>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />

                    <label>Password</label>

                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />

                    <button
                        type="submit"
                        className="primary-btn"
                    >
                        Login
                    </button>

                </form>

                <p>
                    Don't have an account?{" "}

                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;