import { Link } from "react-router-dom"

export default function CrewCard({ crewmate }) {
  return (
    <div
      style={{
        backgroundColor: "#111",
        color: "#f5f5f5",
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "16px",
        width: "180px",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
      }}
    >
      <h3 style={{ color: "#4dabf7", marginBottom: "8px" }}>{crewmate.name}</h3>
      <p style={{ margin: "4px 0" }}>
        <strong>Category:</strong> {crewmate.category}
      </p>
      <p style={{ margin: "4px 0" }}>
        <strong>Attribute:</strong> {crewmate.attribute}
      </p>
      {crewmate.extra_info && (
        <p style={{ fontSize: "0.9em", color: "#ccc" }}>{crewmate.extra_info}</p>
      )}

      <Link
        to={`/crew/${crewmate.id}`}
        style={{
          marginTop: "10px",
          padding: "6px 12px",
          backgroundColor: "#4dabf7",
          color: "#000",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        View
      </Link>
    </div>
  )
}