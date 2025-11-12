import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import CrewList from "./pages/CrewList"
import CreateCrewmate from "./pages/CreateCrewmate"
import EditCrewmate from "./pages/EditCrewmate"
import CrewDetail from "./pages/CrewDetail"
import CrewGallery from "./pages/CrewGallery"

export default function App() {
  return (
    <Router>
      <Sidebar />

      <div
        style={{
          marginLeft: "220px", 
          padding: "20px",
          minHeight: "100vh",
          backgroundColor: "#000000ff",
          color: "#f5f5f5", 
        }}
      >
        <Routes>
          <Route path="/" element={<CrewList />} />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="/edit/:id" element={<EditCrewmate />} />
          <Route path="/crewmate/:id" element={<CrewDetail />} />
          <Route path="/gallery" element={<CrewGallery />} />
        </Routes>
      </div>
    </Router>
  )
}