import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"

export default function CrewForm({ crewmateId }) {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [category, setCategory] = useState("")
  const [attribute, setAttribute] = useState("")
  const [extraInfo, setExtraInfo] = useState("")

  
  useEffect(() => {
    if (crewmateId) {
      fetchCrewmate()
    }
  }, [crewmateId])

  async function fetchCrewmate() {
    const { data, error } = await supabase
      .from("crewmates")
      .select("*")
      .eq("id", crewmateId)
      .single()

    if (error) {
      console.error("Error fetching crewmate:", error)
    } else {
      setName(data.name)
      setCategory(data.category)
      setAttribute(data.attribute)
      setExtraInfo(data.extra_info || "")
    }
  }

  
  async function handleSubmit(e) {
    e.preventDefault()

    if (!name || !category || !attribute) {
      alert("Please fill out all required fields.")
      return
    }

    if (crewmateId) {
      
      const { error } = await supabase
        .from("crewmates")
        .update({
          name,
          category,
          attribute,
          extra_info: extraInfo,
        })
        .eq("id", crewmateId)

      if (error) {
        console.error("Error updating crewmate:", error)
      } else {
        alert("Crewmate updated!")
        navigate("/")
      }
    } else {
      
      const { error } = await supabase.from("crewmates").insert([
        {
          name,
          category,
          attribute,
          extra_info: extraInfo,
        },
      ])

      if (error) {
        console.error("Error creating crewmate:", error)
      } else {
        alert("New crewmate added!")
        navigate("/")
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        backgroundColor: "#111",
        padding: "20px",
        borderRadius: "10px",
        border: "1px solid #333",
        maxWidth: "500px",
        margin: "0 auto",
        color: "#f5f5f5",
      }}
    >
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter crewmate name"
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "4px",
            backgroundColor: "#000",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "6px",
          }}
        />
      </label>

      <label>
        Category:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "4px",
            backgroundColor: "#000",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "6px",
          }}
        >
          <option value="">-- Select a Category --</option>
          <option value="Warrior">Warrior</option>
          <option value="Mage">Mage</option>
          <option value="Engineer">Engineer</option>
          <option value="Healer">Healer</option>
        </select>
      </label>

      <label>
        Attribute:
        <select
          value={attribute}
          onChange={(e) => setAttribute(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "4px",
            backgroundColor: "#000",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "6px",
          }}
        >
          <option value="">-- Select an Attribute --</option>
          {category === "Warrior" && (
            <>
              <option value="Strength">Strength</option>
              <option value="Defense">Defense</option>
            </>
          )}
          {category === "Mage" && (
            <>
              <option value="Mana">Mana</option>
              <option value="Intelligence">Intelligence</option>
            </>
          )}
          {category === "Engineer" && (
            <>
              <option value="Innovation">Innovation</option>
              <option value="Precision">Precision</option>
            </>
          )}
          {category === "Healer" && (
            <>
              <option value="Compassion">Compassion</option>
              <option value="Restoration">Restoration</option>
            </>
          )}
        </select>
      </label>

      <label>
        Extra Info:
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)} 
          placeholder="Enter extra details..."
          style={{
            width: "100%",
            padding: "8px",
            marginTop: "4px",
            backgroundColor: "#000",
            color: "#fff",
            border: "1px solid #444",
            borderRadius: "6px",
            minHeight: "80px",
          }}
        />
      </label>

      <button
        type="submit"
        style={{
          backgroundColor: "#2d6f5cff",
          color: "#000",
          padding: "10px 20px",
          borderRadius: "6px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        {crewmateId ? "Update Crewmate" : "Create Crewmate"}
      </button>
    </form>
  )
}
