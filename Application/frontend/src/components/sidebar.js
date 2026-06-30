import { NavLink } from "react-router-dom";

const MODULES = [
  { to: "/", label: "Dashboard", letter: "D", end: true },
  { to: "/students", label: "Students", letter: "S" },
  { to: "/courses", label: "Courses", letter: "C" },
  { to: "/attendance", label: "Attendance", letter: "A" },
  { to: "/reports", label: "Reports", letter: "R" },
];

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-label">Modules</div>
      <ul className="sidebar-nav">
        {MODULES.map((mod) => (
          <li key={mod.to}>
            <NavLink
              to={mod.to}
              end={mod.end}
              className={({ isActive }) =>
                "sidebar-link" + (isActive ? " active" : "")
              }
            >
              <span className="sidebar-badge">{mod.letter}</span>
              {mod.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
