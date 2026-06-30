import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";
import Login from "./pages/Login";

import { useAuth } from "./hooks/useAuth";

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/students"
          element={
            <RequireAuth>
              <AppLayout>
                <Students />
              </AppLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/courses"
          element={
            <RequireAuth>
              <AppLayout>
                <Courses />
              </AppLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/attendance"
          element={
            <RequireAuth>
              <AppLayout>
                <Attendance />
              </AppLayout>
            </RequireAuth>
          }
        />

        <Route
          path="/reports"
          element={
            <RequireAuth>
              <AppLayout>
                <Reports />
              </AppLayout>
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
