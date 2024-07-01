import './App.css'
import HomePage from './pages/HomePage/HomePage.tsx'
import LoginPage from './pages/LoginPage/LoginPage.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SearchPage from './pages/SearchPage/SearchPage.tsx'
import ReviewPage from './pages/ReviewPage/ReviewPage.tsx'
import ConfirmPage from './pages/ConfirmPage/ConfirmPage.tsx'
import RegisterPage from './pages/RegisterPage/RegisterPage.tsx'
import User from './pages/ProfilePage/User.tsx'
import FavoritePage from './pages/FavoritePage/FavoritePage.tsx'
import { Navigate } from "react-router-dom";


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = { <Navigate to="/login" /> }></Route>

          <Route path='/home' element = { <HomePage /> }></Route>

          <Route path='/login' element = { <LoginPage /> }></Route>
          
          <Route path='/register' element = { <RegisterPage /> }></Route>

          <Route path='/search' element = { <SearchPage /> }></Route>

          <Route path='/review' element = { <ReviewPage /> }></Route>

          <Route path='/confirm' element = { <ConfirmPage /> }></Route>

          <Route path = '/user' element = { <User /> }></Route>

          <Route path = '/favorite' element = { <FavoritePage /> }></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
