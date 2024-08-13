import "./App.css"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from "./components/landing/Landing"
import AdminSignup from "./components/admin/AdminSignup/AdminSignup"
import Login from "./components/login/Login"
import Signup from "./components/signup/Signup"
import AdminLogin from "./components/admin/AdminLogin/AdminLogin"
import Admin from "./components/admin/caterers/Admin"
import Booking from "./components/booking/Booking"
import Contact from "./components/contact/Contact"
import Navbar from "./components/navbar/Navbar"
const App = () => {
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/adminsignup" element={<AdminSignup/>}/>
          <Route path="/adminlogin" element={<AdminLogin/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/booking" element={<Booking/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/admin" element={<Admin/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App