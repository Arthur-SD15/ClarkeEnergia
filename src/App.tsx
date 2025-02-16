import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import LoginPage from './pages/Login'
import Register from './pages/Register'
import MyConsumption from './components/MyConsumption/MyConsumption'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<ProtectedRoute element={<LoginPage />} isLoginRoute={true} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={<ProtectedRoute element={<MyConsumption />} />}
        />
      </Routes>
    </Router>
  )
}

export default App
