import React, {Component} from 'react';

import axios from '../../axios-order';
import {connect} from "react-redux";
import Spinner from '../../components/UI/Spinner/Spinner';
import AuxWrapper from '../../hoc/AuxWrapper';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls
    from '../../components/Burger/BuildControls/BuildControls';
import * as actions from "../../store/actions/index";


export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey]
            })
            .reduce((sum, el) => sum + el, 0);
        return sum > 0;
    }

    purshaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }

    purshaseCancelHandler = () => this.setState({purchasing: false})

    purshaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }

    render() {
        const disableInfo = {...this.props.ingredients};
        for (let key in disableInfo)
            disableInfo[key] = disableInfo[key] <= 0;

        let orderSummary = null;
        let burger = this.props.error ? <p>The ingredients can't be loaded!</p> : <Spinner/>;

        if (this.props.ingredients) {
            burger = (
                <AuxWrapper>
                    <Burger ingredients={this.props.ingredients}/>

                    <BuildControls
                        ordered={this.purshaseHandler}
                        disabled={disableInfo}
                        purchaseable={this.updatePurchaseState(this.props.ingredients)}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        ingredientAdded={this.props.onIngredientAdded}
                        isAuth={this.props.isAuthenticated}
                        price={this.props.totalPrice}/>
                </AuxWrapper>
            );
            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                purchaseCancelled={this.purshaseCancelHandler}
                purchaseContinued={this.purshaseContinueHandler}
                ingredients={this.props.ingredients}/>;
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));


