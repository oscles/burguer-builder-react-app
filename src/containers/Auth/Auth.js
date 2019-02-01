import React, {Component} from 'react';
import classes from './Auth.css';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import * as actions from '../../store/actions/index';
import {connect} from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from "react-router";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }
    
    componentDidMount() {
        if (!this.props.buildingBuilder && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        this.props.onAuth(email, password, this.state.isSignup);
    }

    switchAuthModeHandler = (event) => {
        event.preventDefault();
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        });
    }

    render() {
        let errorMessage = null;
        let authenticatedRedirect = null;

        if (this.props.isAuthenticated) {
            authenticatedRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {Object.keys(this.state.controls).map((element, key) => (
                    <Input
                        key={key}
                        elementType={this.state.controls[element].elementType}
                        elementConfig={this.state.controls[element].elementConfig}
                        value={this.state.controls[element].value}
                        invalid={!this.state.controls[element].valid}
                        shouldValidate={this.state.controls[element].validation}
                        touched={this.state.controls[element].touched}
                        changed={(event) => this.inputChangedHandler(event, element)}/>
                ))}
                <Button btnType="Success">SUBMIT</Button>
            </form>
        );

        if (this.props.loading)
            form = <Spinner/>;

        if (this.props.error)
            errorMessage = (<p>{this.props.error.message}</p>);

        return (
            <div className={classes.Auth}>
                {authenticatedRedirect}
                {errorMessage}
                {form}
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBuilder: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
