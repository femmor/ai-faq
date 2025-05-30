import { Route, Routes, BrowserRouter as Router } from "react-router-dom"

import Login from "./pages/Login"
import PrivateRoute from "./components/PrivateRoute"
import AdminDashboard from "./pages/AdminDashboard"
import ChatInterface from "./components/ChatInterface"

const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatInterface />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
