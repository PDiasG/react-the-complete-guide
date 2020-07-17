import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
import Auxiliar from '../../../hoc/Auxiliar';
import withClass from '../../../hoc/withClass';

import AuthContext from '../../../context/auth-context';

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElement = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElement.current.focus();
    }

    render() {
        console.log('[Person.js] rendering...')
        return (
            <Auxiliar>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please login</p>}
                <p>I'm {this.props.name} and I am {this.props.age} years old</p>
                <input 
                    ref={this.inputElement} 
                    type='text' 
                    onChange={this.props.changed} 
                    value={this.props.name}/>
                <button onClick={this.props.click}>Delete</button>
            </Auxiliar>
        );    
    }
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person); 