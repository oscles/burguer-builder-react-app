import React, { Component } from 'react';

import classes from './Modal.css';
import AuxWrapper from '../../../hoc/AuxWrapper';
import BackDrop from '../Backdrop/Backdrop';

class Modal extends Component {

	shouldComponentUpdate(nextProps, nextState) {
		// it do try that component rendering inecently
		return nextProps.show !== this.props.show ||
			nextProps.children !== this.props.children;
	}

	render() {
		const style = {
			transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
			opacity: this.props.show ? '1' : '0'
		};

		return (
			<AuxWrapper>
				<BackDrop show={this.props.show}
				          clicked={this.props.modalClosed}/>
				<div style={style} className={classes.Modal}>
					{this.props.children}
				</div>
			</AuxWrapper>
		);
	}
}

export default Modal;
