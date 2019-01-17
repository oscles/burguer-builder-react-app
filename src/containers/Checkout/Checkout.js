import React, {Component} from 'react';
import {connect} from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from "react-router";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    checkoutCancelledHandler = () => this.props.history.goBack();

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/'/>;
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/'/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                        ingredients={this.props.ingredients}/>

                    <Route
                        path={`${this.props.match.path}/contact-data`}
                        component={ContactData}/>
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);