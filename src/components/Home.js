import React from 'react'
import { useState, useEffect } from 'react'
import Search from './Search'

const row = {
    margin: "3rem 0",
    display: "flex",
    justifyContent: "center"
}
const container = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    aligItems: "center",
    textAlign: "center"
}
const card = {
    marginBottom: "60px"
}
const image = {
    height: "20rem"
}

// const col = {
//     display: "flex",
//     flex: "1 33%"
// }



const Home = (props) => {
    const [data, setdata] = useState([]);
    const [searchterms, setsearchterms] = useState("")
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    useEffect((req, res) => {
        fetch('https://today-menu.herokuapp.com/messdetails', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(result => {
                setdata(result)
            })

    }, [])


    const updateSearchTerms = (newsearchterms) => {
        setsearchterms(newsearchterms)
    }

    return (
        <>
            <img src={process.env.REACT_APP_LOGO} width="320" height="170" className=" rounded mx-auto d-block d-inline-block  mx-auto  align-top" alt="" />

            <Search refreshFunction={updateSearchTerms} />
            <div className='container' style={container}>
                <div className="row" style={row}>

                    {
                        data.map(item => {
                            return (

                                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 " >
                                    <div className="card" style={card}>
                                        <img src={item.todaysmenu} className="card-img-top" alt="..." style={image} />
                                        <div className="card-body">
                                            <h5 className="card-title">{capitalize(item.messname)}</h5>
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
                            )
                        })
                    }
                </div>
            </div >
        </>

    )
}
export default Home
