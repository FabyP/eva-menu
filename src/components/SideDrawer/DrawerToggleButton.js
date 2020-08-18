import React from 'react';
import './DrawerToggleButton.css';

const drawerToggleButton = props => (
    <button className="toggleButton" onClick={props.click}>
        <div className="toggleButtonline"></div>
        <div className="toggleButtonline"></div>
        <div className="toggleButtonline"></div>
    </button>
);

export default drawerToggleButton;