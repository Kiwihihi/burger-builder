import React, { Component } from 'react'
import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'

class Burger extends Component {
    render() {
        
        let transformedIngredients = 
            Object.keys(this.props.ingredients)
            .map(igKey => {
                return [...Array(this.props.ingredients[igKey])]
                    .map((x, index) => {
                        return <BurgerIngredient key={igKey + index} type={igKey}/>
                    })
            })
            .reduce((acc, el) => {
                return acc.concat(el)
            }, [])
            if(transformedIngredients.length === 0) {
                transformedIngredients = <p>Please start adding ingredients !</p>
            }
            // console.log(typeof(transformedIngredients), transformedIngredients)
        return (
            <div className={classes.Burger}>
                    <BurgerIngredient type="bread-top"/>
                    {transformedIngredients}
                    <BurgerIngredient type="bread-bottom"/>
            </div>
        );
    }s
}

export default Burger;