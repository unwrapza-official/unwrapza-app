import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'

function App() {
  const location = useLocation();

  const disableHeader = location.pathname === '/Login'
  
  return (
    <>
      {!disableHeader && <Header />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
      </Routes>
    </>
  )
}

export default App
