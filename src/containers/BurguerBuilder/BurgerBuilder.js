import React, {Component} from 'react';

import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import AuxWrapper from '../../hoc/AuxWrapper';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls
    from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(resp => {
                this.setState({ingredients: resp.data});
            })
            .catch(error => this.setState({error: true}));
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey]
            })
            .reduce((sum, el) => sum + el, 0);
        this.setState({purchaseable: sum > 0});
    }

    purshaseHandler = () => this.setState({purchasing: true})

    purshaseCancelHandler = () => this.setState({purchasing: false})

    purshaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients)
            queryParams.push(
                `${encodeURIComponent(i)}=${encodeURIComponent(this.state.ingredients[i])}`
            );

        queryParams.push(`price=${this.state.totalPrice}`);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;
        const priceAddition = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            ingredients: updateIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount > 0) {
            const updateCount = oldCount - 1;
            const updateIngredients = {
                ...this.state.ingredients
            };
            updateIngredients[type] = updateCount;
            const priceReduction = INGREDIENTS_PRICE[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceReduction;
            this.setState({
                ingredients: updateIngredients,
                totalPrice: newPrice
            });
            this.updatePurchaseState(updateIngredients);
        }
    }

    render() {
        const disableInfo = {...this.state.ingredients};
        for (let key in disableInfo)
            disableInfo[key] = disableInfo[key] <= 0;

        let orderSummary = null;
        let burger = <Spinner/>;

        if (this.state.ingredients) {
            burger = (
                <AuxWrapper>
                    <Burger ingredients={this.state.ingredients}/>

                    <BuildControls
                        ordered={this.purshaseHandler}
                        disabled={disableInfo}
                        purchaseable={this.state.purchaseable}
                        ingredientRemoved={this.removeIngredientHandler}
                        ingredientAdded={this.addIngredientHandler}
                        price={this.state.totalPrice}/>
                </AuxWrapper>
            );
            orderSummary = <OrderSummary
                price={this.state.totalPrice}
                purchaseCancelled={this.purshaseCancelHandler}
                purchaseContinued={this.purshaseContinueHandler}
                ingredients={this.state.ingredients}/>;
        }

        return (
            <AuxWrapper>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purshaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </AuxWrapper>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);


