import React, { useState } from "react";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import notescontext from "../context/notes/noteContext";

const Modal = (props) => {

    const context = useContext(notescontext);
    const navigate = useNavigate()

    const { editnote } = context;

    const [updatedmenu, setupdatedmenu] = useState("")
    const [url, seturl] = useState("");
    // console.log(props)

    const [mess, setmess] = useState({
        id: "",
        ownername: "",
        ownerphone: "",
        messname: "",
        messaddress: "",
        plateprice: "",
        lunchtime: "",
        dinnertime: "",
        monthlyprice: "",
    });
    // const [mess, setmess] = useState({
    //     id: "",
    //     ownername: props.crd[0].ownername,
    //     ownerphone: props.crd[0].ownerphone,
    //     messname: props.crd[0].messname,
    //     plateprice: props.crd[0].plateprice,
    //     lunchtime: props.crd[0].lunchtime,
    //     dinnertime: props.crd[0].dinnertime,
    //     monthlyprice: props.crd[0].monthlyprice,
    //     todaysmenu: ""
    // });

    useEffect(() => {
        if (url) {
            console.log("Updating the note", mess);
            editnote(props.crd[0]._id, mess.ownername, mess.ownerphone, mess.messname, mess.messaddress, mess.plateprice, mess.lunchtime, mess.dinnertime, mess.monthlyprice, url)
            navigate('/');
            props.toast.success("Note Updated SuccessFully", { autoClose: 1000 })
        }
        // eslint-disable-next-line
    }, [url])

    const handleclick = async (e) => {
        const data = new FormData();
        data.append("file", updatedmenu)
        data.append("upload_preset", "todaysmenu");
        data.append("cloud_name", "todayscuisine");
        await fetch(process.env.REACT_APP_CLOUD_MENU, {
            method: "post",
            body: data
        }).then(res => res.json()).then(data => seturl(data.url)).catch(err => console.log(err))


    };
    const onchange = (e) => {
        setmess({ ...mess, [e.target.name]: e.target.value });

    };


    return (
        <div>
            {/* <button
                type="button"
                // className="btn btn-primary d-none"
                ref={ref}
                data-toggle="modal"
                data-target="#exampleModal"
            >
                Launch demo modal
            </button> */}

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {" "}
                                Edit Mess Menu
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <h6 style={{ textAlign: "center" }}><strong><i>Just update the field you want to update.</i></strong>Your rest fields info are with us.It will be shown to the users automatically.</h6>
                                <img src={process.env.REACT_APP_LOGO} alt="LOGO" className=" rounded mx-auto d-block d-inline-block  mx-auto  align-top" />
                                <div className="form-group">
                                    <label htmlFor="ownername">Ownername</label>
                                    <input
                                        type="text"
                                        value={mess.ownername}
                                        className="form-control"
                                        id="ownername"
                                        name="ownername"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter Ownername"
                                        minLength={5}
                                        required
                                        onChange={onchange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ownerphone">Ownerphone</label>
                                    <input
                                        type="tel"
                                        value={mess.ownerphone}
                                        className="form-control"
                                        id="ownerphone"
                                        name="ownerphone"
                                        minLength={5}
                                        required
                                        placeholder="Your Phone Number"
                                        onChange={onchange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="messname">MessName</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={mess.messname}
                                        id="messname"
                                        minLength={5}
                                        required
                                        name="messname"
                                        placeholder="Enter mess name"
                                        onChange={onchange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="messaddress">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={mess.messaddress}
                                        id="messaddress"
                                        minLength={5}
                                        required
                                        name="messaddress"
                                        placeholder="Enter mess address"
                                        onChange={onchange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="plateprice">PlatePrice</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={mess.plateprice}
                                        id="plateprice"
                                        minLength={5}
                                        required
                                        name="plateprice"
                                        placeholder="Enter per plate price"
                                        onChange={onchange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lunchtime">Lunchtime</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={mess.lunchtime}
                                        id="lunchtime"
                                        minLength={5}
                                        required
                                        name="lunchtime"
                                        placeholder="Enter lunch time"
                                        onChange={onchange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dinnertime">Dinnertime</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={mess.dinnertime}
                                        id="dinnertime"
                                        minLength={5}
                                        required
                                        name="dinnertime"
                                        placeholder="Enter dinner time"
                                        onChange={onchange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="monthlyprice">MonthlyPrice</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={mess.monthlyprice}
                                        id="monthlyprice"
                                        minLength={5}
                                        required
                                        name="monthlyprice"
                                        placeholder="Enter monthlyprice"
                                        onChange={onchange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="todaysmenu">TodaysMenu</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        value={mess.todaysmenu}
                                        id="todaysmenu"
                                        required
                                        name="todaysmenu"
                                        onChange={(e) => setupdatedmenu(e.target.files[0])}
                                    />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                // ref={refclose}
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" onClick={handleclick} data-dismiss="modal" className="btn btn-primary">
                                Update Note
                            </button>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
