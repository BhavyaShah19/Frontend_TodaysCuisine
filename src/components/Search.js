import React, { useState } from 'react'

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

const Search = (props) => {
    const [searchterms, setsearchterms] = useState("")
    const [userdetails, setuserdetails] = useState([])
    const onchangeSearch = (query) => {
        query = query.toLowerCase();
        setsearchterms(query);
        props.refreshFunction(query)
        fetch("https://today-menu.herokuapp.com/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query })
        }).then(res => res.json()).then(results => {
            setuserdetails(results)
        }).catch(err => { console.log(err) })
    };

    return (
        <div className='container' style={container}>
            <form className="d-flex" style={{ justifyContent: "flex-end", alignItems: "center" }} >
                <input className="form-control me-2" type="search" placeholder="Search" value={searchterms} aria-label="Search" onChange={(e) => onchangeSearch(e.target.value)} />
                <i className="fa fa-search" aria-hidden="true" style={{ position: "absolute", marginRight: "1rem", fontSize: "1.3rem" }}></i>
            </form>
            <div className="row" style={row}>

                {
                    searchterms && userdetails.map(item => {
                        return (
                            <div  >
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
                                        <li className="list-group-item">Address-{item.messaddress}</li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default Search
