import { useParams } from "react-router-dom"
import CrewForm from "../components/CrewForm"

export default function EditCrewmate() {
  const { id } = useParams()

  return (
    <div style={{ padding: "20px", backgroundColor: "#000", color: "#f5f5f5" }}>
      <h2>Edit Crewmate</h2>
      <CrewForm crewmateId={id} />
    </div>
  )
}