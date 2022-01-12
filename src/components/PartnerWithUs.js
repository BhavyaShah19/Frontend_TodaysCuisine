import React from 'react'
import "../styles/Partner.css"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
const PartnerWithUs = (props) => {
    const host = "http://localhost:3001";
    let history = useNavigate();

    window.onbeforeunload = function () {
        localStorage.clear();
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            history('/admin');

        }
        else {
            history('/login');
        }
    }, []);

    const [ownerprofile, setownerprofile] = useState({
        ownername: "",
        ownerphone: "",
        messname: "",
        messaddress: "",
        plateprice: "",
        lunchtime: "",
        dinnertime: "",
        monthlyprice: "",
        todaysmenu: ""
    });

    const [menu, setmenu] = useState("");
    const [url, seturl] = useState("");

    const onchange = (e) => {
        setownerprofile({ ...ownerprofile, [e.target.name]: e.target.value })
    }

    useEffect((req, res) => {
        if (url) {
            fetch(`https://today-menu.herokuapp.com/filldetails`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    ownername: ownerprofile.ownername,
                    ownerphone: ownerprofile.ownerphone,
                    messname: ownerprofile.messname.toLowerCase(),
                    messaddress: ownerprofile.messaddress,
                    plateprice: ownerprofile.plateprice,
                    lunchtime: ownerprofile.lunchtime,
                    dinnertime: ownerprofile.dinnertime,
                    monthlyprice: ownerprofile.monthlyprice,
                    todaysmenu: url,
                }),
            }).then(res => res.json()).then(data => {
                if (data.error) {
                    res.json({ error: data.error })
                }
                else {
                    history('/');
                    props.toast.success("Mess Added SuccessFully", { autoClose: 1000 });
                }
            })
        }

    }, [url])


    const postmessphoto = (req, res) => {
        const data = new FormData();
        data.append("file", menu)
        data.append("upload_preset", "todaysmenu");
        data.append("cloud_name", "todayscuisine");
        fetch(process.env.REACT_APP_CLOUD_MENU, {
            method: "post",
            body: data
        }).then(res => res.json()).then(data => seturl(data.url)).catch(err => console.log(err))

    }

    return (
        <div>
            <div className="container-fluid px-1 py-5 mx-auto">
                <div className="row d-flex justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                        <div className="card">
                            {/* <h5 className="text-center mb-4">Today's Cuisine</h5> */}
                            <img src={process.env.REACT_APP_LOGO} width="350" height="220" className="d-inline-block  mx-auto mb-4 align-top" alt="" />

                            <form className="form-card" onSubmit={(event) => { event.preventDefault() }}>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Mess Owner name<span className="text-danger"> *</span></label> <input onChange={onchange} required value={ownerprofile.ownername} type="text" id="ownername" name="ownername" placeholder="Enter your first name" /> </div>
                                    <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Mess Owner Phone<span className="text-danger"> *</span></label> <input onChange={onchange} required value={ownerprofile.ownerphone} type="tel" id="ownerphone" name="ownerphone" placeholder="Enter your mobile number" /> </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Mess name<span className="text-danger"> *</span></label> <input onChange={onchange} required value={ownerprofile.messname} type="text" id="messname" name="messname" placeholder="Aai mess" /> </div>
                                    <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Per plate Price<span className="text-danger"> *</span></label> <input onChange={onchange} required value={ownerprofile.plateprice} type="text" id="plateprice" name="plateprice" placeholder="Rs.80" /> </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Lunch Time<span className="text-danger"> *</span></label> <input onChange={onchange} required value={ownerprofile.lunchtime} type="text" id="lunchtime" name="lunchtime" placeholder="12pm to 3pm" /> </div>
                                    <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Dinner Time<span className="text-danger"> *</span></label> <input onChange={onchange} required value={ownerprofile.dinnertime} type="text" id="dinnertime" name="dinnertime" placeholder="6pm to 10pm" /> </div>
                                </div>
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Monthly price<span className="text-danger"> *</span></label> <input onChange={onchange} required value={ownerprofile.monthlyprice} type="text" id="monthlyprice" name="monthlyprice" placeholder="eg.Rs.1500/lunch,Rs.3000/lunch-dinner" /> </div>
                                    <div className="form-group col-sm-6 flex-column d-flex"> <label className="form-control-label px-3">Address<span className="text-danger"> *</span></label> <input onChange={onchange} required value={ownerprofile.messaddress} type="text" id="messaddress" name="messaddress" placeholder="Address" /> </div>

                                </div>

                                <div className="row justify-content-center">
                                    <div className="form-group col-sm-6 flex-column d-flex mb-3 form-group col-sm-6 flex-column d-flex"><label htmlFor="formFileSm" className="form-label">Upload Todays Menu<span className="text-danger"> *</span></label>
                                        <input className="form-control form-control-sm" name='todaysmenu' required onChange={(e) => setmenu(e.target.files[0])} id="formFileSm" type="file" />
                                    </div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="form-group col-sm-6"> <button type="submit" onClick={() => postmessphoto()} className="btn-block btn-primary">Post on Today's Cuisine</button> </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PartnerWithUs
