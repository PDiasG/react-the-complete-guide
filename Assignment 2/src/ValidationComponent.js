import React from 'react'

const validationComponent = (props) => {
    if (props.length < 5) return <p>Too short!</p>
    else if (props.length > 20) return <p>Too long!</p>
    else return null
}

export default validationComponent;