import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

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
          <Persons 
            persons={this.state.persons} 
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />
      );
    } 

    return (
      <div className={classes.App}>
        <Cockpit 
          title={this.props.title} 
          persons={this.state.persons} 
          showPersons={this.state.showPersons}
          clicked={this.togglePersonsHandler} />
        {persons}
      </div>
    );
  }
}

export default App;
