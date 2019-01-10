import React from 'react';

import Button from '../../UI/Button/Button';
import AuxWrapper from '../../../hoc/AuxWrapper';

const orderSummary = (props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map((ingKey, index) => {
            return (
                <li key={ingKey + index}>
                    <span style={{textTransform: 'capitalize'}}>{ingKey}</span>
                    : {props.ingredients[ingKey]}
                </li>
            )
        });
    return (
        <AuxWrapper>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button
                btnType='Danger'
                clicked={props.purchaseCancelled}>CANCEL
            </Button>
            <Button
                btnType='Success'
                clicked={props.purchaseContinued}>CONTINUE
            </Button>
        </AuxWrapper>
    );
};

export default orderSummary;
