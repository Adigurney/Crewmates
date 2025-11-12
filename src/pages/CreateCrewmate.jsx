import CrewForm from "../components/CrewForm"

export default function CreateCrewmate() {
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

    <div style={{ padding: "20px", color: "#f5f5f5" }}>
      <h2>Create New Crewmate</h2>
      <CrewForm />
    </div>
    </div>
  )
}