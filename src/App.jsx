import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import AddTask from "./pages/AddTask";
import EditTask from "./pages/EditTask";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Pages */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Pages */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <Tasks />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tasks/add"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <AddTask />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tasks/edit/:id"
                    element={
                        <ProtectedRoute>
                            <Navbar />
                            <EditTask />
                        </ProtectedRoute>
                    }
                />

                {/* Unknown URL */}
                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;