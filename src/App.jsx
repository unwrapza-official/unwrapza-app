import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import NotFoundPage from './pages/NotFoundPage'
import ScrollToTop from './utils/ScrollToTop'
import AdminRoute from './components/auth/AdminRoute'
import AdminPage from "./pages/account/AdminPage"
import SearchResults from "./pages/SearchResults" 
import AccountLayout from "./pages/account/AccountLayout"
import CalendarPage from "./pages/account/AccountCalendarPage"
import MyPeoplePage from "./pages/account/AccountPeoplePage"
import ProfilePage from "./pages/account/AccountProfilePage"
import WishlistPage from './pages/account/AccountWishlistPage'
import UpperColors from './components/UpperColors'
import ProductDetails from './components/products/ProductDetails'
import Disclaimer from './pages/legal/Disclaimer'
import TermsConditions from './pages/legal/TermsConditions'
import PrivacyPolicy from './pages/legal/PrivacyPolicy'
import CookiePolicy from './pages/legal/CookiePolicy'
import About from './pages/About'
import {Toaster} from 'react-hot-toast';

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
      <Toaster 
        position="top-right"
        toastOptions={{
          // DEFAULT TOAST STYLE
          style: {
            background: "#ffffff",
            color: "#333",
            borderRadius: "12px",
            padding: "12px 16px",
            border: "1px solid #e5e7eb",
            fontSize: "14px",
            fontWeight: 500,
          },
          
          // SUCCESS TOAST STYLE
          success: {
            iconTheme: {
              primary: "#44A77D",
              secondary: "#ffffff",
            },
            style: {
              border: "1px solid #44A77D",
            },
          },

          // ERROR TOAST STYLE
          error: {
            iconTheme: {
              primary: "#e11d48",
              secondary: "#ffffff",
            },
            style: {
              border: "1px solid #e11d48",
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/cookiepolicy" element={<CookiePolicy/>}/>
        <Route path="/privacy" element={<PrivacyPolicy/>}/>
        <Route path="/disclaimer" element={<Disclaimer/>}/>
        <Route path="/terms" element={<TermsConditions/>}/>
        <Route path="/account" element={<AccountLayout/>}>
          <Route index element={<ProfilePage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="people" element={<MyPeoplePage />} />
          <Route path="wishlist" element={<WishlistPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>}/>
        <Route path ="/product/:id" element={<ProductDetails/>}/>
        <Route path="/search" element={<SearchResults />}/>
        <Route path="/*" element={<NotFoundPage/>}/>
      </Routes>
      {!disableComponent && <Footer/>}
    </>
  )
}

export default App
