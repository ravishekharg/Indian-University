import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Attendance from "./pages/Attendance";
import Reports from "./pages/Reports";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Sidebar />

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/students"
          element={<Students />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/attendance"
          element={<Attendance />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;