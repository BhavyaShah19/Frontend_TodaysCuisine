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
const Signup = (props) => {
    const history = useNavigate();
    const { showalert } = props
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        const response = await fetch("https://today-menu.herokuapp.com/createuser", {

            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });
        const json = await response.json();
        if (json.success && cpassword === password) {
            localStorage.setItem('token', json.authtoken);
            props.toast.success("SuccesFully Created Account", { autoClose: 1000 });
            history('/login')
        }
        else {
            props.toast.error(`${cpassword !== password ? 'Password does not match' : 'Invalid Credentials'}`, { autoClose: 1000 });
        }
    }

    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container" style={container}>
            <div className="card" style={card}>

                <img src={process.env.REACT_APP_LOGO} width="250" height="200" className="d-inline-block  mx-auto mb-4 align-top" alt="" />

                <form onSubmit={handlesubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" onChange={onchange} className="form-control" id="name" name="name" required aria-describedby="emailHelp" placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" onChange={onchange} className="form-control" id="email" name="email" required aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" onChange={onchange} className="form-control" id="password" name="password" required minLength={5} placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input type="password" onChange={onchange} className="form-control" id="cpassword" name="cpassword" required minLength={5} placeholder="Confirm Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default Signup
