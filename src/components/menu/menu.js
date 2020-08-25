import React,{useEffect, useState} from 'react';
/* import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import TabScrollButton from '@material-ui/core/TabScrollButton';
import Tabs from '@material-ui/core/Tabs'; */
import axios from 'axios';

import './menu.css'

function LoadMenu(){

    const [categories, setCategories] = useState([]);
    const [menuitems, setMenuitems] = useState([]);

    const fetchCategories = async() => {
        await axios.get('http://localhost:9000/categories')
        .then(function (response) {
            setCategories(response.data);
            console.log(response.data);
            console.log(categories);
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    const fetchMenuitems = async() => {
        await axios.get('http://localhost:9000/menuitems')
        .then(function (response) {
            setMenuitems(response.data);
            console.log(response.data);
            console.log(categories);
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    useEffect(() =>{
        fetchCategories();
        fetchMenuitems();
    }, [])
    
    
    return(
        <div>
            {menuitems.map(MENUITEM => (
                <p key={MENUITEM._id}>{MENUITEM.name}<br/>{MENUITEM.description} </p>
            ))}
        </div>
/*             <div>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    {categories.map(category => (
                        <Tab key={category._id} label={category.name} {...a11yProps(0)} />
                    ))}
                    </Tabs>
                </AppBar>        

                <div>
                    {categories.map(category => (
                        <TabPanel value={category._id} key={category._id} index="0">
                            {category.name}
                        </TabPanel>  
                    ))}
                    {menuitems.map(MENUITEM => (
                                <p key={MENUITEM._id}>{MENUITEM.name}<br/>{MENUITEM.description} </p>
                    ))}
                </div>
            </div> */
        
        

    );

}

export default LoadMenu;