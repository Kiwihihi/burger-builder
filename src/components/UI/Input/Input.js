import React from 'react';
import classes from './Input.module.css'

const Input = (props) => {
    let inputEl = null
    const inputClasses = [classes.InputEl]

    if(props.invalid) {
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case 'input':
            inputEl = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;

        case 'textarea':
            inputEl = <textarea 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            break;

        case 'tel':
            inputEl = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}/>
            break;

        case 'select':
            inputEl = (
                <select {...props.elementConfig}
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {
                        props.elementConfig.options.map(option => {
                           return (
                            <option value={option.value} key={option.value}>
                                {option.displayValue}
                            </option>
                           )
                        })
                    }
                </select>
            )
            break;

    
        default:
            inputEl = <input 
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.label}>
                {props.label}
            </label>
            {inputEl }
        </div>
    );
};

export default Input;