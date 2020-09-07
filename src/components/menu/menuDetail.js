import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import http from '../../http-common';
import {MdAdd} from 'react-icons/md';
import { IconContext } from "react-icons";

import './menuDetail.css'



function LoadMenuDetail(){
    const [menuitems, setMenuitems] = useState([]);
    const {id} = useParams();

    const fetchMenuitems = async() => {
        await http.get('/menuitems')
        .then(function (response) {
            setMenuitems(response.data);
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    useEffect(() =>{
        fetchMenuitems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const details = menuitems.filter((item, index) =>{
        return item._id === id
        console.log(details)
    })



    return(
        <div>
            {details.map((item, index) => ( 
                <div> 
                    <h1 key={item._id} className="title">{item.name}</h1>
                    <img className= 'menuImage' src={item.image} alt="Ein Bild der Speise"/>
                    <p key={item._id}>{item.description}</p>
                    <p key={item._id}>Zutaten: {item.ingredients}</p>
                    <p key={item._id}>Inhaltsstoffe: {item.additive}</p>
                </div>
            ))} 
        </div>
    );
}
export default LoadMenuDetail;