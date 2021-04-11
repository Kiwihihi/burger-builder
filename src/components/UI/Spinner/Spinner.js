import React from 'react';
import classes from './Spinner.module.css'

function Spinner(props) {
    return (
        <div className={classes.loader}>
            Loading...
        </div>
    );
}

export default Spinner;