import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {name: 'Pedro', age: 21},
      {name: 'Danilo', age: 21},
      {name: 'Daniel', age: 23}
    ]
  }

  switchNameHandler = (newName) => {
    this.setState({persons: [
      {name: newName, age: 21},
      {name: 'Danilo', age: 21},
      {name: 'Daniel', age: 23}
    ]})
  };

  nameChangedHandler = (event) => {
    this.setState({persons: [
      {name: 'Pedro', age: 21},
      {name: event.target.value, age: 21},
      {name: 'Daniel', age: 23}
    ]})
  };

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid black',
      padding: '8px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is working</p>
        <button 
          style={style}
          onClick={() => this.switchNameHandler('Pidro')}>Switch Name</button>

        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}
          click={this.switchNameHandler.bind(this, 'Pedro')} />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          changed={this.nameChangedHandler} />
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age} />
      </div>
    );
  }
}

export default App;
