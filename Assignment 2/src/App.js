import React, { Component } from 'react';
import './App.css';
import './ValidationComponent';
import ValidationComponent from './ValidationComponent';
import CharComponent from './CharComponent';

class App extends Component {

  state = {
    input: ''
  }

  textChangeListener = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  deleteCharHandler = (index) => {
    let str = this.state.input.split('');
    str.splice(index, 1);
    str = str.join('');

    this.setState({
      input: str
    });
  }

  render() {    
    const style = {
      fontWeight: 'bold'
    }

    let charArray = null;

    charArray = (
      <div>
        {this.state.input.split('').map((c, index) => {
          return <CharComponent char={c} deleteHandler={() => this.deleteCharHandler(index)}/>
        })}
      </div>
    )

    return (
      <div className="App">        
        <hr/><span  style={style}>Exercise</span><hr/>

        <ol>
          <li>Create an input field (in App component) with a change listener which outputs the length of the entered text below it (e.g. in a paragraph).</li>
          <li>Create a new component (ValidationComponent) which receives the text length as a prop</li>
          <li>Inside the ValidationComponent, either output "Text too short" or "Text long enough" depending on the text length (e.g. take 5 as a minimum length)</li>
          <li>Create another component (CharComponent) and style it as an inline box (display: inline-block, padding: 16px, text-align: center, margin: 16px, border: 1px solid black).</li>
          <li>Render a list of CharComponents where each CharComponent receives a different letter of the entered text (in the initial input field) as a prop.</li>
          <li>When you click a CharComponent, it should be removed from the entered text.</li>
        </ol>
        <p>Hint: Keep in mind that JavaScript strings are basically arrays!</p>

        <hr/><span  style={style}>Solution</span><hr/>

        <input type='text' onChange={this.textChangeListener} value={this.state.input}/>
        <p>Legnth: {this.state.input.length}</p>
        <ValidationComponent length={this.state.input.length} />

        {charArray}

      </div>
    );
  }
}

export default App;
