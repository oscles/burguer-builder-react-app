import React from 'react';

import classes from './BackDrop.css';

const backDrop = (props) => {
	const divBackDrop = (
		<div
			className={classes.Backdrop}
			onClick={props.clicked}>
		</div>
	);
	return props.show ? divBackDrop : null
};

export default backDrop;
