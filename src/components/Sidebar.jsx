import { NavLink } from "react-router-dom"

export default function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "12px 20px",
    textDecoration: "none",
    color: isActive ? "white" : "#6f6d6dff",
    backgroundColor: isActive ? "#007bff" : "transparent",
    borderRadius: "4px",
    marginBottom: "6px",
  })

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#000000ff",
        color: "white",
        padding: "20px",
        position: "fixed",   
        top: 0,              
        left: 0,             
      }}
    >
      <h2 style={{ color: "white" }}>🚀 Crew Builder</h2>
      <nav style={{ marginTop: "30px" }}>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/create" style={linkStyle}>
          + Add Crewmate
        </NavLink>
        <NavLink to="/gallery" style={linkStyle}>
          Crew Gallery
        </NavLink>
      </nav>
    </div>
  )
}