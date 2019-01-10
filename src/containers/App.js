import React, {Component} from 'react';
import {Route, Switch} from "react-router";

import Layout from './Layout/Layout';
import BurgerBuilder from './BurguerBuilder/BurgerBuilder';
import Checkout from "./Checkout/Checkout";
import Orders from "./Orders/Orders";

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path='/checkout' component={Checkout}/>
                        <Route path='/orders' component={Orders}/>
                        <Route path='/' exact component={BurgerBuilder}/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
