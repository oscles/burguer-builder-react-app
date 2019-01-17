import React from "react";
import classes from "./Order.css";

const order = (props) => {
    const style = {
        textTransform: 'capitalize',
        margin: '0 8px',
        padding: '5px',
        border: '1px solid #ccc',
        display: 'inline-block'
    };

    const ingredients = Object.keys(props.ingredients)
        .map((ingredient, index) => (
            <span
                key={index}
                style={style}>
                {ingredient} ({props.ingredients[ingredient]})
            </span>
        ));

    return (
        <div className={classes.Order}>
            Ingredients: {ingredients}
            <p>Price:
                <strong> ${Number.parseFloat(props.price).toFixed(2)}</strong>
            </p>
            <p>Owner: {props.owner}</p>
        </div>
    )
};

export default order;