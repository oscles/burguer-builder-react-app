import React, {Component} from 'react';

import {connect} from "react-redux";
import axios from '../../../axios-order';
import classes from './ContactData.css';
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as orderActions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required)
            isValid = value.trim() !== '' && isValid;
        if (rules.minLength)
            isValid = value.length >= rules.minLength && isValid;
        if (rules.maxLength)
            isValid = value.length <= rules.maxLength && isValid;

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

    orderHandler = (event) => {
        event.preventDefault();
        const orderData = {};
        for (let identifier in this.state.orderForm)
            orderData[identifier] = this.state.orderForm[identifier].value;

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData
        };
        this.props.onOrderBurger(order, this.props.token);
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const inputValueElement = event.target.value;
        const updateOrderForm = {...this.state.orderForm};
        updateOrderForm[inputIdentifier].value = inputValueElement;
        updateOrderForm[inputIdentifier].valid = this.checkValidity(
            inputValueElement,
            updateOrderForm[inputIdentifier].validation
        );
        updateOrderForm[inputIdentifier].touched = true;

        let formIsValid = true;
        for (let inputIdentifier in this.state.orderForm)
            formIsValid = this.state.orderForm[inputIdentifier].valid && formIsValid;

        this.setState({orderForm: updateOrderForm, formIsValid});
    }

    render() {
        let form = (
            <form onSubmit={this.orderHandler}>
                {Object.keys(this.state.orderForm).map((element, key) => (
                    <Input
                        key={key}
                        elementType={this.state.orderForm[element].elementType}
                        elementConfig={this.state.orderForm[element].elementConfig}
                        value={this.state.orderForm[element].value}
                        invalid={!this.state.orderForm[element].valid}
                        shouldValidate={this.state.orderForm[element].validation}
                        touched={this.state.orderForm[element].touched}
                        changed={(event) => this.inputChangedHandler(event, element)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading)
            form = <Spinner/>;

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));