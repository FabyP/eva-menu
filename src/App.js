import React, { useState } from 'react';

import './App.css';

import LoadMenu from './components/menu/menu'
import LoadAbout from './components/about/about'
import LoadNav from './components/Nav/nav'
import LoadOrder from './components/order/order'
import LoadMenuDetail from './components/menu/menuDetail'
import SideDrawer from './components/SideDrawer/sideDrawer'
import Backdrop from './components/Backdrop/backdrop'

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import logo from './images/Logo.png'



function App() {

  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);


  const drawerToggleClickHandler = () =>{
    if(sideDrawerOpen){
      setSideDrawerOpen(false)
      
    }
    else{
      setSideDrawerOpen(true)
    }
  };

  const  backdropClickHandler = () => {
    setSideDrawerOpen(false) ;
  };


  let backdrop;
  
  if(sideDrawerOpen){
    backdrop = <Backdrop click = {backdropClickHandler}/>;
  }

  return (
    <Router>
      <div className = "app" style={{height: '100%'}}>
        <LoadNav drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop}
        <Switch>
          <Route path="/" exact component = {Home}/>
          <Route path="/about" component = {LoadAbout}/>
          <Route path="/menu" exact component = {LoadMenu}/>
          <Route path="/order" component = {LoadOrder}/>
          <Route path = "/menu/:id" component = {LoadMenuDetail}/>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className='hauptseite'>
    <main style={{marginTop: '100px'}}>
      <h1 className='willkommen'>Herzlich Willkommen im Dorfkrug Oberhone</h1>
      <img className= 'logo' src={logo} alt="Logo" />;
      <div className="button-around">
        <Link to="/about">
        <button type="button" className="button-hauptseite">
            Allgemeine Infos
        </button>
        </Link>
        <Link to="/menu">
        <button type="button" className="button-hauptseite">
            Zur Speisekarte
        </button>
        </Link>
      </div>
    </main>
  </div>
);

export default App;
