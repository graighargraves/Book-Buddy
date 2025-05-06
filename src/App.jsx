import { useState, useEffect } from 'react'
import AllBooks from './components/Books'
import {Routes, Route, Navigate, useNavigate} from "react-router-dom"
import Navbar from './components/Navigations'
import SingleBook from './components/SingleBook'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState(storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null);
  const navigate = useNavigate();


  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/")

  };

  return (
    <>
    <Navbar token={token} logout={logout}/>
     <Routes>
        <Route path="/" element={<AllBooks />} />
        <Route path="register" element={<Register setToken={setToken} setUser={setUser}/>} />
        <Route path="login" element={<Login setToken={setToken} setUser={setUser}/>} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/account" element={<Account token={token}/>}/>
     </Routes>
    </>
  )
}

export default App;
