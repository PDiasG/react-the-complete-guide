import React from 'react';

import './AlignCenter.css'

const userInput = (props) => {
    return(
        <div className="AlignCenter">
            <input type='text' onChange={props.setUsername} value={props.username}></input>
        </div>
    )
};

export default userInput;