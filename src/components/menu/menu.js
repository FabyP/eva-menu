import React,{useEffect, useState} from 'react';
import{ Tabs, Tab, AppBar, Typography, Box, TabScrollButton} from '@material-ui/core';
import axios from 'axios';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import {MdAdd} from 'react-icons/md';
import { IconContext } from "react-icons";

import http from '../../http-common';

import './menu.css'
import {useGlobalState} from '../../context/global-context';

import {Link} from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default, 
    },
  }));

function LoadMenu(){

    /* für das Auslesen aus der MongoDb */
    const [categories, setCategories] = useState([]);
    const [menuitems, setMenuitems] = useState([]);
    const [sortedMenu, setSortedMenu] = useState({});
    const {cartCount, fetchCartCount} = useGlobalState();


    const fetchCategories = async() => {
        await http.get('/categories')
        .then(function (response) {
            setCategories(response.data);
           
            response.data.map(function (category) {
                let categoryId = category._id;
                if(categoryId !== undefined){
                    setSortedMenu((prevState) => ({               
                        ...prevState,[categoryId]: []
                     }))
                }
                
            })

        })
        .catch(function (error) {
            console.log(error);
        })
    };

    const fetchMenuitems = async() => {
        await http.get('/menuitems')
        .then(function (response) {
            setMenuitems(response.data);
             response.data.map(function (menuitem) {
                let menucategoriesId = menuitem.categoryID;
                console.log(menucategoriesId);
                if(menucategoriesId !== undefined){
                setSortedMenu((prevState) => ({               
                        ...prevState,
                        [menucategoriesId]: [...prevState[menucategoriesId], menuitem]
                }))
            }       
            }) 
            console.log(response.data);
            console.log(sortedMenu);
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    const addToCart = async( menuItemId ) => {
      await http.post('/cart', {
        menuItemId: menuItemId,
      })
      .then(function (response) {
        fetchCartCount();
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


    useEffect(() =>{
        fetchCategories();
        fetchMenuitems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    /* für die Tabpanel und Appbar */
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChangeAppbar = (event, newValue) => {
        setValue(newValue);
    };

    
    return(
        <div className={classes.root}>
            <AppBar position="static" className="appbar">
                <Tabs value={value} onChange={handleChangeAppbar} aria-label="tabs">
                    <Tabs value={selectedTab} onChange={handleChange}>
                        {categories.map((category, index) => (
                                <Tab key={category._id} label={category.name} {...a11yProps(index)} />                                                      
                        ))}
                    </Tabs>
                </Tabs>
            </AppBar>

            {categories.map((category, index) => (
                <TabPanel key={category._id} value={value} index={index}> 
                    <h1 className="categorieTitle">{category.name}</h1>
                    <img className= 'imageCategory' src={category.image} alt="Kategorie Bild"/>
                    {/* <p>{category._id}</p>
                    <p>{JSON.stringify(sortedMenu[category._id])}</p> */}
                    {sortedMenu[category._id] !== undefined &&
                        sortedMenu[category._id].map((menu) =>(
                          <div className="items">
                            <Link to={`/menu/${menu._id}`} className="menuTitleLink"><h2 className="menuTitle">{menu.name} {menu.menuitemprice.$numberDecimal}€</h2></Link>
                            <div className="description">
                              {menu.description} <IconContext.Provider value={{ color: "black", size: "2rem" }}><li className="add" onClick={() => addToCart(menu._id)}><a href="#"><MdAdd/></a></li></IconContext.Provider>
                            </div>
                          </div>
                        ))
                      }                
                </TabPanel>                                                  
            ))}
        </div>
        
    );

}

export default LoadMenu;