import React from 'react';

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]
function BuildControls(props) {
    const {disabled, purchasable,ordered, Price, ingredientAdded, ingredientRemoved} = props
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{Price.toFixed(2)}</strong>$</p>
            {controls.map(ctrl => (
                <BuildControl 
                    key={ctrl.label}
                    label={ctrl.label}
                    disabled={disabled[ctrl.type]}
                    added = {() => ingredientAdded(ctrl.type)}
                    removed = {() => ingredientRemoved(ctrl.type)}
                />
            ))}
            <button className={classes.OrderButton}
                disabled={!purchasable}
                onClick={ordered}
            >
                ORDER NOW
            </button>
        </div>
    );
}

export default BuildControls;