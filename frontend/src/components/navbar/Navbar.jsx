import "./navbar.css"
import { Link } from "react-router-dom";

const Navbar = ({transparent}) => {
  return (
    
    <div className='navbar_container'>
       <nav className={`navbar ${transparent ? 'transparent' : 'colored'}`}>
        <div className='navlogo'>
       <Link to ="/">
        <img src="./assets/logo.png" alt="navlogo" />
        </Link>
      
        </div>
        <div className='nav_links'>
            <a href='/adminlogin'> Business</a>
            <a href='/contact'>Contact Us</a>
            <a href='/login'>Book</a>
        </div>
        </nav>
    </div>
    
  )
}

export default Navbar