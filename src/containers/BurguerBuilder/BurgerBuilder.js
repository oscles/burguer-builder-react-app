import React, { Component } from 'react';

import AuxWrapper from '../../hoc/AuxWrapper';
import Burger from '../../components/Burger/Burger';
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
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4
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
		}
	}

	render() {
		const disableInfo = {...this.state.ingredients};
		for (let key in disableInfo)
			disableInfo[key] = disableInfo[key] <= 0;

		return (
			<AuxWrapper>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls
					disabled={disableInfo}
					ingredientRemoved={this.removeIngredientHandler}
					ingredientAdded={this.addIngredientHandler}/>
			</AuxWrapper>
		);
	}
}

export default BurgerBuilder;
