import React from "react";

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItem from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<DrawerToggle clicked={props.drawerToggleClicked}/>
		<div className={classes.Logo}><Logo/></div>
		<nav className={classes.DesktopOnly}>
			<NavigationItem/>
		</nav>
	</header>
);

export default toolbar;
