import React from 'react';
import './sideDrawer.css';
import {Link, withRouter} from 'react-router-dom';

const sideDrawer = props =>{

    let drawerClasses ='side-Drawer';
    if(props.show){
        console.log(props.show);
        drawerClasses = 'side-Drawer open';
    }

    return(
        <nav className={drawerClasses}>
        <ul>
            <Link  to='/menu'>
                    <li>Speisekarte</li>
            </Link>
            <Link  to='/about'>
                    <li>Allgemeine Infos</li>
            </Link>
        </ul>
    </nav>
    );

};
export default sideDrawer;