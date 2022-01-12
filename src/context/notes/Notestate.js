import NoteContext from "./noteContext";
import { useState } from "react";
import React from 'react'

const Notestate = (props) => {
    const [notes, setnotes] = useState([])

    const editnote = async (id, ownername, ownerphone, messname, messaddress, plateprice, lunchtime, dinnertime, monthlyprice, todaysmenu) => {
        const response = fetch(`https://today-menu.herokuapp.com/updatemess/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ ownername, ownerphone, messname, messaddress, plateprice, lunchtime, dinnertime, monthlyprice, todaysmenu }),
        });
        // const json = response.json();
        // eslint-disable-next-line


        let newnotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newnotes.length; index++) {
            const element = newnotes[index];
            if (element._id === id) {
                newnotes[index].ownername = ownername;
                newnotes[index].ownerphone = ownerphone;
                newnotes[index].messname = messname;
                newnotes[index].messaddress = messaddress;
                newnotes[index].plateprice = plateprice;
                newnotes[index].lunchtime = lunchtime;
                newnotes[index].dinnertime = dinnertime;
                newnotes[index].monthlyprice = monthlyprice;
                newnotes[index].todaysmenu = todaysmenu;
                break
            }
        };
        setnotes(newnotes)
    };


    return (
        <div>
            <NoteContext.Provider
                value={{ notes, editnote }}>{props.children}</NoteContext.Provider>
        </div>
    );
};

export default Notestate
