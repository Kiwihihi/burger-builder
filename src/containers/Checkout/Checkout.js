import React, { Component } from 'react';
import {Route} from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state= {
            ingredients:{
                salad: 1,
            },
            price: 0,

        }
    }
    
    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search)
        // console.log('query :',this.props.location.search)
        let price = 0
        const ingredients = {}
        for(let param of query.entries()) {
            if(param[0] === 'price') {
                price =param[1]
            }
            else {
                ingredients[param[0]] = + param[1]

            }
            console.log('ingredients:', ingredients )
            this.setState({ingredients: ingredients, price: price})
        }
        this.setState({
            ingredients: ingredients
        })
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {      
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCanceled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                    render={(props) => <ContactData 
                        ingredients={this.state.ingredients}
                        price={this.state.price}
                        history = {props.history}
                        />}
                />
            </div>
        );
    }
}

export default Checkout;