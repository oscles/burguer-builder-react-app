import React, {Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        query.forEach((value, key) => {
            if (key === 'price')
                price = +value;
            else
                ingredients[key] = +value;
        });
        // for (let ingredient of query.entries())
        // ingredients[ingredient[0]] = +ingredient[1];
        this.setState({ingredients, price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.state.ingredients}/>


                {/*    render nested routes

                    <Route
                    path={`${this.props.match.path}/contact-data`}
                    component={ContactData}/>
                */}

                <Route
                    path={`${this.props.match.path}/contact-data`}
                    render={(props) => (<ContactData
                        {...props} //allow to pass the attribute of object router or to use withRouter
                        totalPrice={this.state.price}
                        ingredients={this.state.ingredients}/>)}/>
            </div>
        );
    }
}

export default Checkout;