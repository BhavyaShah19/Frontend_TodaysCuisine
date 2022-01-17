import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router';
import Modal from './Modal';
import PartnerWithUs from './PartnerWithUs';

const card = {
    marginBottom: "60px"
}
const image = {
    height: "20rem"
}

// const row = {
//     margin: "3rem 0",
//     display: "flex",
//     justifyContent: "center"
// }

const col = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
}

// const container = {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     aligItems: "center",
//     textAlign: "center"
// }

const Admin = (props) => {
    const [cards, setcards] = useState([]);


    const ref = useRef(null);
    let navigate = useNavigate()
    useEffect(async () => {
        if (localStorage.getItem('token')) {
            const response = await fetch(`https://today-menu.herokuapp.com/fetchallmessdetails`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                },
            });
            const json = await response.json();
            console.log(json);
            setcards(json)

        }
        else {
            navigate('/login')
        }
    }, [])


    const updatenote = (note) => {
        ref.current.click();
        setcards({ id: note._id, ownername: note.ownername, ownerphone: note.ownerphone, messname: note.messname, messaddress: note.messaddress, plateprice: note.plateprice, lunchtime: note.lunchtime, dinnertime: note.dinnertime, monthlyprice: note.monthlyprice, todaysmenu: note.todaysmenu })

    }
    // const [showmodal, setshowmodal] = useState(false);

    return (
        <div>
            <img src={process.env.REACT_APP_LOGO} width="320" height="200" className="rounded mx-auto d-block d-inline-block  mx-auto  align-top" alt="" />

            {cards.length == 0 && <PartnerWithUs toast={props.toast} /> ||
                <div className="btn" style={{ display: "flex", justifyContent: "center", marginBottom: "3rem" }} >
                    {/* <button onClick={() => !showmodal ? <Modal /> : ''}>Update todays menu</button> */}

                    <button

                        className="btn btn-outline-primary btn-lg"
                        onClick={() => updatenote(cards)}
                        data-toggle="modal"
                        data-target="#exampleModal">Update todays menu</button>
                </div>}
            <div>
                {<Modal crd={cards} toast={props.toast} />}
            </div>
            {
                cards.map(item => {
                    return (
                        // <div className='container' style={container}>
                        //     <div className="row" style={row}>
                        <div className="col-sm" style={col}>
                            <div className="card" style={card}>
                                <img src={item.todaysmenu} className="card-img-top" alt="..." style={image} />
                                <div className="card-body">
                                    <h5 className="card-title">{item.messname}</h5>
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Per Plate price-{item.plateprice}</li>
                                    <li className="list-group-item">Lunch Time-{item.lunchtime}</li>
                                    <li className="list-group-item">Dinner Time-{item.dinnertime}</li>
                                    <li className="list-group-item">Monthly Price-{item.monthlyprice}</li>
                                    <li className="list-group-item">Mess Address-{item.messaddress}</li>
                                </ul>
                            </div>
                        </div>
                        //     </div>
                        // </div>
                    )
                })
            }
        </div >
    )
}

export default Admin
