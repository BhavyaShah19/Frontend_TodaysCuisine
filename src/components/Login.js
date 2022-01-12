import React from 'react'
import { useNavigate } from 'react-router';
import { useState } from 'react';

const container = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
}
const card = {
    marginTop: "3rem",
    maxWidth: "400px",
    alignItems: "center",
    padding: "3rem"
}
const h2 = {
    paddingBottom: "2rem"
}

const Login = (props) => {
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://today-menu.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            localStorage.setItem('user_id', json.user_info.id);
            // console.log(json)

            props.toast.success("Logged in SuccesFully", { autoClose: 1000 });
            navigate('/partner');
        }
        else {
            props.toast.error("Invalid Credentials", { autoClose: 1000 });
        }
    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };


    return (

        <div className="container" style={container}>
            <div className="card" style={card}>
                <img src={process.env.REACT_APP_LOGO} width="250" height="200" className="d-inline-block  mx-auto mb-4 align-top" alt="" />
                <h6 style={{ marginBottom: "3rem" }}>If you are not registered with us than go to the <b>SIGNUP</b> page and than try to login again</h6>

                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" required className="form-control" id="email" value={credentials.email} onChange={onchange} name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" required className="form-control" value={credentials.password} onChange={onchange} id="password" name="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary"  >Login</button>
                </form>
            </div>
        </div>

    )
}

export default Login
