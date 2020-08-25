import React from 'react';
import ToggleButton from '../SideDrawer/DrawerToggleButton';
import {MdShoppingBasket} from 'react-icons/md';
import { IconContext } from "react-icons";
/*MdShoppingCart*/
import './nav.css';

import {Link, withRouter} from 'react-router-dom';


    const navigationBar = props => (
        <header className="navBar">
            <nav className="navigation">
                <div>
                    <ToggleButton click={props.drawerClickHandler}/>
                </div>
                <div className="nav_logo"><a href="/">EVAs Imbiss</a></div>
                <div className="spacer"></div>
                <div className="nav_items">
                    <ul>
                        <Link to='/order'>
                            <IconContext.Provider value={{ color: "white", size: "2rem" }}>
                                <li className="basket"><MdShoppingBasket /></li>
                            </IconContext.Provider>
                        </Link>
                    </ul>
                </div>
            </nav>
        </header>
    );

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

export default navigationBar;