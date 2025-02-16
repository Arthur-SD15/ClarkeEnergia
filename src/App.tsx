import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Manege from './pages/Manege'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute element={<Login />} isLoginRoute={true} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={<ProtectedRoute element={<Home />} />}
        />
        <Route
          path="/manege-supplier"
          element={<ProtectedRoute element={<Manege />} />}
        />
      </Routes>
    </Router>
  )
}

export default App
