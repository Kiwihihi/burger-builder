import React from 'react';
import classes from './Order.module.css'

const Order = (props) => {
    let ingredients = Object.keys(props.ingredients)
        .map((igKey) => {
            return (
                <span 
                    style={{
                        textTransform:'capitalize',
                        display:'inline-block',
                        margin:'0 8px',
                        padding:'5px',
                        border:'1px solid #ccc',
                    }}
                    key={igKey}
                    >
                    {igKey} ({props.ingredients[igKey]})
                </span>
            )
        })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>Price: <strong>{props.price} $</strong></p>
        </div>
    );
};

export default Order;