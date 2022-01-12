import React from 'react';
import './Button.css';

const Button = ({text, onClickFunc}) => {
    return <button type="button" onClick={onClickFunc}> {text} </button>
}

export default Button