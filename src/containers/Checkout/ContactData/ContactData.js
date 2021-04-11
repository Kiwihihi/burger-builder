import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-order'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import validator from 'validator'

class ContactData extends Component {
    constructor(props) {
        super(props);
        this.state={
            orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your name'
                    },
                    value:'',
                    validation: {
                        required: true
                    },
                    valid: false
                },

                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your email'
                    },
                    value:'',
                    validation: {
                        required: false
                    },
                    valid: false
                },

                address: {
                    elementType: 'textarea',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your address'
                    },
                    value:'',
                    validation: {
                        required: true
                    },
                    valid: false
                },

                phoneNumber: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'tel',
                        placeholder: 'Your phone number'
                    },
                    value:'',
                    validation: {
                        required: true,

                    },
                    valid: false
                },

                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                       options: [
                        {value: 'fastest', displayValue: 'Giao hàng nhanh'},
                        {value: 'cheapest', displayValue: 'Giao hàng tiếp kiệm'},

                       ]
                    },
                    value:'fastest',
                    valid: true
                },
              
            },
            loading: false,
            formIsValid: false

        }
    }
    
    orderHandler = (e) => {
        e.preventDefault()
        this.setState({loading: true})
        const formData = {}
        for(let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value
        }

         const order = {
            ingredients: this.props.ingredients,
            price: Number.parseFloat(this.props.price),
            formData
        }
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({loading: false})
                console.log('Number', this.props.price)
                this.props.history.push('/')
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }

    inputChangedHandler = (e, key) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFromEl = {...updatedOrderForm[key]}
        updatedFromEl.value = e.target.value
        updatedFromEl.valid = this.checkValidation(key, updatedFromEl.value)
        updatedOrderForm[key] = updatedFromEl
        let formIsValid = true
        for(let fieldName in updatedOrderForm) {
            formIsValid = updatedOrderForm[fieldName].valid && formIsValid
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid
        })
    }

    checkValidation(fieldName, value){
        let isValid = true;

        switch (fieldName) {
            case 'name':
                isValid = value.trim() !== ''
                 break;

            case 'address':
                isValid = value.trim() !== ''
                 break;

            case 'email':
                isValid = value.trim() !== '' && validator.isEmail(value.toLowerCase())
                 break;

            case 'phoneNumber':
                const isPhoneNumber = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/ ;
                isValid = value.trim() !== ''&& isPhoneNumber.test(value)
                 break;
        
            default:
                isValid = true
                break;
        }

        return isValid
    }
    render() {
        const formElsArray = []
        for(let key in this.state.orderForm) {
            formElsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = ( 
            <form onSubmit={this.orderHandler}>
                {formElsArray.map((formEl) => (
                    <Input elementType={formEl.config.elementType} 
                    elementConfig={formEl.config.elementConfig}
                    value={formEl.config.value}
                    invalid={!formEl.config.valid}
                    changed={(e,) => (this.inputChangedHandler(e,formEl.id))}
                    key={formEl.id}
                    />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
            </form>
        )
        if(this.state.loading) {
            form = <Spinner />
        }
  
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;