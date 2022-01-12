import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router';

const logo = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const img = {
    height: "55px",
    width: "55px"
}

function Navbar(props) {
    const navigate = useNavigate()
    let location = useLocation();


    // const logout = () => {
    //     localStorage.removeItem('token')
    //     navigate('/login');
    //     props.toast.success("You have successfully logged out", { autoClose: 1000 });
    // }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <Link className="navbar-brand" to="/" style={{ fontFamily: "cursive" }}>
                <div className="logo" style={logo}>
                    <img src={process.env.REACT_APP_LOGO} style={img} width="320" height="170" className=" rounded mx-auto d-block d-inline-block  mx-auto  align-top" alt="" />
                </div>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse">
                        <Link className={`nav-link  ${location.pathname === "/" ? "active" : ""
                            }`} to="/">Home</Link>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse">
                        <Link className={`nav-link  ${location.pathname === "/partner" ? "active" : ""
                            }`} to="/partner">Partner With Us</Link>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse">
                        <Link className={`nav-link  ${location.pathname === "/admin" ? "active" : ""
                            }`} to="/admin">Admin</Link>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse">
                        <Link className={`nav-link  ${location.pathname === "/feedback" ? "active" : ""
                            }`} to="/feedback">Feedback</Link>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse">
                        <Link className={`nav-link  ${location.pathname === "/login" ? "active" : ""
                            }`} to="/login">Login</Link>
                    </li>
                    <li className="nav-item" data-toggle="collapse" data-target=".navbar-collapse">
                        <Link className={`nav-link  ${location.pathname === "/signup" ? "active" : ""
                            }`} to="/signup">Signup</Link>
                    </li>
                </ul>
            </div>
        </nav >
    )
}


export default Navbar
