/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import ToggleButton from '../SideDrawer/DrawerToggleButton';
import {MdShoppingBasket} from 'react-icons/md';
import { IconContext } from "react-icons";
/*MdShoppingCart*/
import './nav.css';
import {useGlobalState} from '../../context/global-context';

import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import http from '../../http-common';

import {Link, withRouter} from 'react-router-dom';

    
   
    const NavigationBar = (props) => {

        const {cartCount, fetchCartCount} = useGlobalState();
        useEffect(() => {
            // Update the document title using the browser API
            fetchCartCount();
            
          },[]);

        const [error, setError] = useState('');

        const callWaiter = async () => {
            const cookies = new Cookies();
            let tableId = cookies.get("table");
            console.log(tableId);
            if(tableId == null){
                setError('Bitte Scannen sie zuerst den QR-Code, damit wir wissen an welchem Tisch sie sich befinden.');
            } else{
                setError('');
               
                await http.patch('/table/' + tableId, {
                    waitressCalled: true,
                })
                .then(function (response) {

                })
                .catch(function (error) {
                    console.log(error);
                });
                
            }

        }      
        return(
            <header className="navBar">
                <nav className="navigation">
                    <div>
                        <ToggleButton click={props.drawerClickHandler}/>
                    </div>
                    <div className="nav_logo"><a href="/">EVAs Imbiss</a></div>
                    <div className="spacer"></div>
                    <div>
                        <button type="button" className="nav-button" onClick={() => callWaiter()}>
                            Kellner rufen
                        </button>
                    </div>
                    <div className="nav_items">
                        <ul>
                            <Link to='/cart'>
                                <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                    <li className="basket"><span>{cartCount}</span><MdShoppingBasket/></li>
                                </IconContext.Provider>
                            </Link>
                        </ul>
                    </div>
                </nav>
                {error ? <div class="alert alert-danger" role="alert">
                {error}
                </div> :''}
            </header>
        )
    };

/*     return(
        <nav className = 'navigation'>
            <h3>Logo</h3>
            <ul className = 'nav-link'>
                <Link style ={navStyle} to='/menu'>
                    <li>Speisekarte</li>
                </Link>
                <Link style ={navStyle} to='/about'>
                    <li>Über Uns</li>
                </Link>
                
            </ul>
        </nav>
    ); */

export default NavigationBar