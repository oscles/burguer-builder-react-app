import React, {Component} from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        const orders = this.props.orders.map(order => (
            <Order
                key={order.id}
                price={order.price}
                owner={order.orderData.name}
                ingredients={order.ingredients}/>
        ));
        return (
            <div>
                {this.props.loading ? <Spinner/> : orders }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));