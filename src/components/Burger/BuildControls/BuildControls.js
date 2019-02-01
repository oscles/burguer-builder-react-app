import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl
                removed={() => props.ingredientRemoved(ctrl.type)}
                added={() => props.ingredientAdded(ctrl.type)}
                key={ctrl.label}
                disabled={props.disabled[ctrl.type]}
                label={ctrl.label}/>
        ))}
        <button
            onClick={props.ordered}
            className={classes.OrderButton}
            disabled={!props.purchaseable}>{props.isAuth ? 'ORDER NOW' : 'SIGN UP FOR ORDER'}</button>
    </div>
);

export default buildControls;
