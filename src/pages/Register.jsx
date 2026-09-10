import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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

        // Check password length
        if (form.password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        // Check password confirmation
        if (form.password !== form.password_confirmation) {
            setError("Passwords do not match.");
            return;
        }

        // Get existing users
        const users =
            JSON.parse(localStorage.getItem("users")) || [];

        // Check if email already exists
        const existingUser = users.find(
            (user) =>
                user.email.toLowerCase() ===
                form.email.toLowerCase()
        );

        if (existingUser) {
            setError("An account with this email already exists.");
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name: form.name,
            email: form.email,
            password: form.password,
        };

        // Save user
        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );

        alert("Registration successful!");

        // Go to login
        navigate("/login");
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>Task Manager</h1>

                <h2>Create Account</h2>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <label>Name</label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />

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
                        placeholder="Minimum 8 characters"
                        required
                    />

                    <label>Confirm Password</label>

                    <input
                        type="password"
                        name="password_confirmation"
                        value={form.password_confirmation}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                    />

                    <button
                        type="submit"
                        className="primary-btn"
                    >
                        Register
                    </button>

                </form>

                <p>
                    Already have an account?{" "}

                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;