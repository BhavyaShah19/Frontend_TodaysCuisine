import React, { useState } from 'react'


function Feedback(props) {
    const [credentials, setcredentials] = useState({ name: "", email: "", phone: "", feedback: "" })

    const handlesubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, feedback } = credentials;
        const response = await fetch(`https://today-menu.herokuapp.com/getfeedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, phone, feedback }),
        })
        const json = await response.json();
        console.log(json);
        props.toast.success("Your Feedback is valuable to us.Thanks!", { autoClose: 1000 })
        e.target.reset();

    }


    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const containerstyle = {
        marginTop: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        textAlign: "center"
    }
    return (
        <>
            <div className="mainbody" style={{ marginTop: "7rem" }}>
                <img src="https://res.cloudinary.com/todayscuisine/image/upload/v1641744759/logo1_ak20t7.png" width="320" height="220" className="rounded mx-auto d-block d-inline-block  mx-auto  align-top" alt="" />

                <h3 style={{ textAlign: "center" }}>Help us to improve our Website</h3>
                <div className="container" style={containerstyle}>

                    <form onSubmit={handlesubmit}>
                        <div className="form-group">
                            <label style={{ 'float': 'left' }} htmlFor="name">Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                minLength={5}
                                onChange={onchange}
                                required
                                aria-describedby="emailHelp"
                                placeholder="Bhavya Shah"
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ 'float': 'left' }} htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                onChange={onchange}
                                name="email"
                                required
                                placeholder="iwndiwni@gmail.com"
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ 'float': 'left' }} htmlFor="phone">Phone</label>
                            <input
                                type="tel"
                                minLength={5}
                                required
                                onChange={onchange}
                                className="form-control"
                                id="phone"
                                name="phone"
                                placeholder="Phone"
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ 'float': 'left' }} htmlFor="feedback">Your Feedback</label>
                            <textarea
                                type="text"
                                required
                                onChange={onchange}
                                className="form-control"
                                id="feedback"
                                name="feedback"
                                placeholder="Your message,suggestions,feedback here..."
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary"  >Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Feedback
