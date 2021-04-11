import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENTS_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // ingredients: {
            //     salad: 0,
            //     bacon: 0,
            //     cheese: 0,
            //     meat: 0,
            // },

            ingredients: null,
            totalPrice: 2,
            purchasable: false,
            purchasing: false,
            loading: false,


        }
    }

    componentDidMount() {
        axios.get('https://react-my-burger-c20a1-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {this.setState({
                ingredients: response.data
            })
        })
        .catch(err => {this.setState({error: true})})
    }
    updatePurchaseState(ingredients) {
        const sum = Object.values(ingredients)
            .reduce((acc, cur) => acc + cur , 0)
        this.setState({purchasable: sum>0})

    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] =  updatedCount
        const oldPrice = this.state.totalPrice
        const priceAddition = INGREDIENTS_PRICE[type]
        const newPrice = oldPrice + priceAddition
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount>0 ? oldCount - 1 :0
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] =  updatedCount
        const oldPrice = this.state.totalPrice
        const priceDeduction = INGREDIENTS_PRICE[type]
        const newPrice = oldPrice - priceDeduction
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients)

    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
        //encodeURLComponent
        const queryParams = []
        for(let i in this.state.ingredients) {
            queryParams.push(i + '=' + 
            this.state.ingredients[i])
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&')
        console.log(queryParams)
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
        
        // this.setState({loading : true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name : 'Duc Anh',
        //         address: {
        //             street: 'Ha Noi',
        //             PhoneNumber: '0227729940',
        //             country: 'Viet Nam'
        //         },
        //         email: 'ducanh1998a4@gmail.com'
              
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json', order)
        //     .then(res => {
        //         this.setState({loading: false, purchasing: false})
        //     })
        //     .catch(err => {
        //         this.setState({loading: false, purchasing: false})
        //     })
    }

    render() {

        const disableInfo = {...this.state.ingredients}
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key]<=0
        }

        let orderSummary = null

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
            if(this.state.ingredients) {
                burger = ( 
                    <Aux>
                        <Burger ingredients={this.state.ingredients}/>
        
                        <BuildControls 
                            ingredientAdded = {this.addIngredientHandler}
                            ingredientRemoved = {this.removeIngredientHandler}
                            disabled={disableInfo}
                            purchasable={this.state.purchasable}
                            ordered={this.purchaseHandler}
                            Price={this.state.totalPrice}
                        />
                    </Aux>
                    )
                orderSummary = <OrderSummary ingredients={this.state.ingredients}
                Price={this.state.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                />
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                   {orderSummary}
                </Modal>

               {burger}
            </Aux>
        );
    }
}
export default withErrorHandler(BurgerBuilder, axios);