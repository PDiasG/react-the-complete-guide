import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Auxiliar from '../hoc/Auxiliar';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      persons: [
        {id: 'qwerty', name: 'Pedro', age: 21},
        {id: 'asdfgh', name: 'Danilo', age: 21},
        {id: 'zxcvbn', name: 'Daniel', age: 23},
        {id: 'tyuiop', name: 'Romanov', age: 22}
      ],
      showPersons: false,
      showCockpit: true,
      changeCounter: 0,
      authenticated: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
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

    this.setState((prevState, props) => {
      return {
        persons : persons,
        changeCounter: prevState.changeCounter + 1
      }
    });
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

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] render');
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
      <Auxiliar>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>

        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
            />
          ) : null}
          {persons}
        </AuthContext.Provider>
      </Auxiliar>
    );
  }
}

export default withClass(App, classes.App);
