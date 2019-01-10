import React, { Component } from 'react';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import AuxWrapper from '../../hoc/AuxWrapper';

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerClosedHandler = () => {
		this.setState({showSideDrawer: false});
	}

	sideDrawerToggleHandler = () => {
		this.setState((state, props) => {
			return {showSideDrawer: !state.showSideDrawer};
		});
	}

	render() {
		return (
			<AuxWrapper>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>

				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}/>

				<main className={classes.Content}>
					{this.props.children}
				</main>

			</AuxWrapper>
		)
	}
}

export default Layout;

