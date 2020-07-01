import React from 'react'

const charComponent = (props) => {
    const style = {
        display: 'inline-block', 
        padding: '16px', 
        textalign: 'center', 
        margin: '16px', 
        border: '1px solid black'
    }

    return <p style={style} onClick={props.deleteHandler}>{props.char}</p>
}

export default charComponent;