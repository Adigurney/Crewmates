import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "../supabaseClient"
import StatsSummary from "../components/StatsSummary"

export default function CrewList() {
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
    <div
      style={{
        backgroundImage: "url('/backgrounds-themes.jpg')",  
        backgroundSize: "cover",                 
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",          
        minHeight: "100vh",                      
        padding: "40px 0",
      }}
    >

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", 
        marginBottom: "40px", padding: "20px", color: "#b0afafff"  }}>
      <h1>My Dungeons and Dragons Crew</h1>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px", color: "grey" }}>
        <div style={{ width: "140%", maxWidth: "500px" }}>
            <StatsSummary crew={crewmates} />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)", 
          gap: "20px",
          alignItems: "stretch",
        }}
      >
        {crewmates.map((crewmate) => (
          <Link
            to={`/crewmate/${crewmate.id}`}
            key={crewmate.id}
            style={{
              display: "block",
              backgroundColor: "#000000ff",
              border: "1px solid #000000ff",
              borderRadius: "10px",
              padding: "15px",
              color: "#7e7a7aff",
              textDecoration: "none",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)"
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(240, 180, 180, 0.1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)"
              e.currentTarget.style.boxShadow = "none"
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>{crewmate.name}</h3>
            <p><strong>Category:</strong> {crewmate.category}</p>
            <p><strong>Attribute:</strong> {crewmate.attribute}</p>
            {crewmate.extra_info && (
              <p style={{ fontStyle: "italic", color: "#dbf566ff" }}>
                {crewmate.extra_info.slice(0, 60)}...
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
    </div>
  )
}
