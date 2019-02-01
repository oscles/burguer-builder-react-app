import React from "react";

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItem from '../NavigationItems/NavigationItems';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.drawerToggleClicked}/>
            <div className={classes.Logo}><Logo/></div>
            <nav className={classes.DesktopOnly}>
                <NavigationItem isAuthenticated={props.isAuth}/>
            </nav>
        </header>
    );
};

export default toolbar;
