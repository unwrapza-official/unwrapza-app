import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import NotFoundPage from './pages/NotFoundPage'
import ScrollToTop from './utils/ScrollToTop'
import AdminPage from "./pages/account/AdminPage"
import AccountCalendarPage from "./pages/account/AccountCalendarPage"
import AccountWishlistPage from "./pages/account/AccountWishlistPage"
import SearchResults from "./pages/SearchResults" 
import Account from "./pages/account/AccountHomePage"
import UpperColors from './components/UpperColors'
import ProductDetails from './components/products/ProductDetails'

function App() {
  const location = useLocation();

  const emptyPages = [
    "/login",
    "/admin",
  ]

  const disableComponent = emptyPages.includes(location.pathname);
  
  return (
    <>
      <UpperColors/>
      {!disableComponent && <Header />}
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/account/calendar" element={<AccountCalendarPage/>}/>
        <Route path="/account/wishlist" element={<AccountWishlistPage/>}/>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/admin" element={<AdminPage />}/>
        <Route path ="/product/:id" element={<ProductDetails/>}/>
        <Route path="/search" element={<SearchResults />}/>
        <Route path="/*" element={<NotFoundPage/>}/>
      </Routes>
      {!disableComponent && <Footer/>}
    </>
  )
}

export default App
