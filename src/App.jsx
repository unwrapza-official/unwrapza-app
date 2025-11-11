import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import NotFoundPage from './pages/NotFoundPage'
import ScrollToTop from './functions/ScrollToTop'

function App() {
  const location = useLocation();

  const disableComponent = location.pathname === '/login'
  
  return (
    <>
      {!disableComponent && <Header />}
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<NotFoundPage/>} />
      </Routes>
      {!disableComponent && <Footer/>}
    </>
  )
}

export default App
