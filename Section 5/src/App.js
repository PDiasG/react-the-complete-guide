import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import Person from './Person/Person';

const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red':'green'};
  color: white;
  font: inherit;
  border: 1px solid black;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.alt ? 'salmon':'lightgreen'};
    color: black;
  }
`;

class App extends Component {
  state = {
    persons: [
      {id: 'qwerty', name: 'Pedro', age: 21},
      {id: 'asdfgh', name: 'Danilo', age: 21},
      {id: 'zxcvbn', name: 'Daniel', age: 23},
      {id: 'tyuiop', name: 'Romanov', age: 22}
    ],
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const index = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[index]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[index] = person;

    this.setState( {persons : persons} );
  }

  togglePersonsHandler = () => {
    const newVal = !this.state.showPersons;
    this.setState({
      showPersons: newVal
    });
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
            click={() => this.deletePersonHandler(index)}
            changed={(event) => this.nameChangedHandler(event, person.id)}
            name={person.name} 
            age={person.age}
            key={person.id} />
          })}
        </div>
      );
    }

    let classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red');
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is working</p>
          
        <StyledButton 
          alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}>{this.state.showPersons ? 'Hide persons':'Show persons'}
        </StyledButton>

        {persons}
      </div>
    );
  }
}

export default App;
