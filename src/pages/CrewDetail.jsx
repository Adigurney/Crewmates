import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { supabase } from "../supabaseClient"

export default function CrewDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [crewmate, setCrewmate] = useState(null)

  useEffect(() => {
    fetchCrewmate()
  }, [])

  async function fetchCrewmate() {
    const { data, error } = await supabase
      .from("crewmates")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching crewmate:", error)
    } else {
      setCrewmate(data)
    }
  }


  async function handleDelete() {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${crewmate.name}?`
    )
    if (!confirmDelete) return

    const { error } = await supabase.from("crewmates").delete().eq("id", id)

    if (error) {
      console.error("Error deleting crewmate:", error)
    } else {
      alert(`${crewmate.name} has been deleted.`)
      navigate("/") 
    }
  }

  if (!crewmate) {
    return <p>Loading...</p>
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#000",
        color: "#bbbbbbff",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#8e8e8fff" }}>
        {crewmate.name}
      </h1>

      <div
        style={{
          backgroundColor: "#111",
          border: "1px solid #333",
          borderRadius: "10px",
          padding: "20px",
          maxWidth: "600px",
          margin: "30px auto",
        }}
      >
        <p><strong>Category:</strong> {crewmate.category}</p>
        <p><strong>Attribute:</strong> {crewmate.attribute}</p>
        {crewmate.extra_info && (
          <p><strong>Details:</strong> {crewmate.extra_info}</p>
        )}

        
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <Link
            to={`/edit/${crewmate.id}`}
            style={{
              backgroundColor: "#355c5cff",
              color: "#000",
              padding: "10px 20px",
              borderRadius: "6px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            ✏️ Edit
          </Link>

          <button
            onClick={handleDelete}
            style={{
              backgroundColor: "#e74c3c",
              color: "#abababff",
              padding: "10px 20px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  )
}