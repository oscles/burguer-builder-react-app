import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router";
import {connect} from 'react-redux';

import Layout from './Layout/Layout';
import BurgerBuilder from './BurguerBuilder/BurgerBuilder';
import Logout from './Auth/Logout/Logout';
import * as actions from '../store/actions/index';
import asyncComponent from "../hoc/asyncComponent/asyncComponent";

const asyncAuth = asyncComponent(() => import('./Auth/Auth'));
const asyncOrders = asyncComponent(() => import('./Orders/Orders'));
const asyncCheckout = asyncComponent(() => import('./Checkout/Checkout'));

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSignup();
    }

    render() {
        let routes = (
            <Switch>
                <Route path='/auth' component={asyncAuth}/>
                <Route path='/' exact component={BurgerBuilder}/>
                <Redirect to='/'/>
            </Switch>
        );

        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/checkout' component={asyncCheckout}/>
                    <Route path='/orders' component={asyncOrders}/>
                    <Route path='/logout' component={Logout}/>
                    <Route path='/' exact component={BurgerBuilder}/>
                    <Redirect to='/'/>
                </Switch>
            );
        }
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
