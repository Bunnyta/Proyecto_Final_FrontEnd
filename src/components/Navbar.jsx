import { Link } from "react-router-dom"
import { useContext } from "react"
import Context from "../context/context.jsx"

const Navbar = () => {
    const { cartTotal } = useContext(Context)
    return (
        <nav className="main-nav">
            <a className="navbar-brand logo" href="#homepage"><img src="/code_course.jpg" alt="" /></a>
            <h2>Code Courses</h2>
            <Link to="/"><h4> Home </h4></Link>
            <Link to="/courses"><h4> Courses </h4></Link>
            <Link to="/register"><h4> Register </h4></Link>
            <Link to="/login"><h4> Login </h4></Link>
            <Link to="/profile"><h4> Profile </h4></Link>
            <Link to="/cart"> <h4>Cart</h4> $ {cartTotal()} </Link>
        </nav>
    )
}

export default Navbar