import React, {Component} from 'react'

import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/SideDrawer/SideDrawer'
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css'

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }
    
    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: ! prevState.showSideDrawer}
        })
    }
    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>

                <SideDrawer closed={this.sideDrawerCloseHandler}
                    open={this.state.showSideDrawer}
                />

                <main className={classes.Content}>
                        {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;