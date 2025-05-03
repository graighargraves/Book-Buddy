import { useState } from 'react'
import bookLogo from './assets/books.png'
import AllBooks from './components/Books'
import {Routes, Route, Navigate} from "react-router-dom"
import Navbar from './components/Navigations'
import SingleBook from './components/SingleBook'
import Login from './components/Login'

function App() {
  // const [token, setToken] = useState(null)
  return (
    <>
    <Navbar />
     <Routes>
      <Route path="/" element={<AllBooks />} />
      <Route path="/books/:id" element={<SingleBook />} />
      <Route path="login" element={<Login />} />
     </Routes>
    </>
  )
}

export default App;
