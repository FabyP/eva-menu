import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';

import './App.css';

import LoadMenu from './components/menu/menu'
import LoadAbout from './components/about/about'
import LoadNav from './components/Nav/nav'
import LoadOrder from './components/order/order'
import LoadMenuDetail from './components/menu/menuDetail'
import SideDrawer from './components/SideDrawer/sideDrawer'
import Backdrop from './components/Backdrop/backdrop'
import Cart from './components/cart/cart'
import {GlobalProvider} from './context/global-context'

import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import logo from './images/LogoEvaHell.png'

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

  useEffect(() => {
    let table = findGetParameter('table');
    let s = findGetParameter('s');
    if(table !== null && s !== null){
      const cookies = new Cookies();
     
      cookies.set('table', table, { path: '/' });
      cookies.set('s', s, { path: '/' });
    }
  },[]);

  function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
        window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}


  let backdrop;
  
  if(sideDrawerOpen){
    backdrop = <Backdrop click = {backdropClickHandler}/>;
  }

  return (
    <Router>
      <div className = "app" style={{height: '100%'}}>
      <GlobalProvider>
        <LoadNav drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer show={sideDrawerOpen}/>
        {backdrop}
        <Switch>
          <Route path="/" exact component = {Home}/>
          <Route path="/about" component = {LoadAbout}/>
          <Route path="/menu" exact component = {LoadMenu}/>
          <Route path="/order" component = {LoadOrder}/>
          <Route path="/cart" exact component = {Cart}/>
          <Route path = "/menu/:id" component = {LoadMenuDetail}/>
        </Switch>
        </GlobalProvider>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className='hauptseite'>
    <main style={{marginTop: '80px'}}>
      <h1 className='willkommen'>Herzlich Willkommen bei EVAs Imbiss</h1>
      {/* <img className= 'logo' src={logo} alt="Logo" />; */}
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
