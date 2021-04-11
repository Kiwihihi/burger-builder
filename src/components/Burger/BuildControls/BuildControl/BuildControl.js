import React from 'react';
import classes from './BuildControl.module.css'

function BuildControl(props) {
    const {disabled, added, removed} = props
    return (
            <div className={classes.BuildControl}>
                <div className={classes.Label}>{props.label}</div>
                <button 
                    className={classes.Less}
                    disabled={disabled}
                    onClick={removed}
                >
                    Less
                </button>

                <button 
                    className={classes.More}
                    onClick={added}
                >
                    More
                </button>
            </div>
    );
}

export default BuildControl;