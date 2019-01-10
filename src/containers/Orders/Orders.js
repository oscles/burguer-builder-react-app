import React, {Component} from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get("/orders.json")
            .then(resp => {
                const fetchedOrders = [];
                for (let key in resp.data) {
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    });
                }
                this.setState({orders: fetchedOrders, loading: false});
            })
            .catch(error => this.setState({loading: false}));
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        price={order.price}
                        ingredients={order.ingredients}/>
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);