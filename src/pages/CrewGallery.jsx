import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../supabaseClient"

export default function CrewGallery() {
  const [crewmates, setCrewmates] = useState([])

  useEffect(() => {
    fetchCrewmates()
  }, [])

  async function fetchCrewmates() {
    const { data, error } = await supabase
      .from("crewmates")
      .select("*")
      .order("created_at", { ascending: false })
    
    if (error) {
      console.error("Error fetching crewmates:", error)
    } else {
      setCrewmates(data)
    }
  }

  return (
    <div>
      <h1 style={{textAlign: "center", marginBottom: "30px", color: "#4dabf7", 
        }}> Crew Gallery</h1>

     <div style={{ textAlign: "center" }}>
      <img src="/Dndbackgrounds.jpg" alt="Crew Gallery Banner"
        style={{
            width: "60%",
            maxWidth: "600px",
            borderRadius: "10px",
            marginBottom: "20px",
            boxShadow: "0 0 20px rgba(77,171,247,0.4)",
            }}
        /></div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {crewmates.map((crewmate) => (
          <Link
            to={`/crewmate/${crewmate.id}`}
            key={crewmate.id}
            style={{
              display: "block",
              padding: "8px",
              backgroundColor: "#373737ff",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#9e9c9cff",
              textAlign: "center"
            }}
          >
            <h3>{crewmate.name}</h3>
            <p>{crewmate.category}</p>
            <p>{crewmate.attribute}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}