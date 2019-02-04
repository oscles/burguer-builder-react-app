import React from "react";

import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import AuxWrapper from '../../../hoc/AuxWrapper';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (props.open)
		attachedClasses = [classes.SideDrawer, classes.Open];

	return (
		<AuxWrapper>
			<BackDrop show={props.open} clicked={props.closed}/>
			<div className={attachedClasses.join(' ')} onClick={props.closed}>
				<div className={classes.Logo}><Logo/></div>
				<nav>
					<NavigationItems isAuthenticated={props.isAuth}/>
				</nav>
			</div>
		</AuxWrapper>
	);
};

export default sideDrawer;
