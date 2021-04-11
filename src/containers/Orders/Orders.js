import axios from 'axios';
import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true
        }
    }
    
    componentDidMount() {
        axios.get('https://react-my-burger-c20a1-default-rtdb.firebaseio.com/orders.json')
            .then(res => {
                const fetchOrders = []
                for(let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading: false, orders: fetchOrders})
            })
            .catch(err => {
                console.log('err', err)
                this.setState({loading: false})
            })
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => 
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={Number.parseFloat(order.price).toFixed(2)}
                    />)
                }
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);