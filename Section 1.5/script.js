function Person(props) {
  return (
    React.createElement("div", { className: "person" },
    React.createElement("h1", null, props.name),
    React.createElement("p", null, "Your age: ", props.age)));


}

var app =
React.createElement("div", null,
React.createElement(Person, { name: "Pedro", age: "21" }),
React.createElement(Person, { name: "Daniel", age: "23" }));



ReactDOM.render(app,
document.querySelector('#app'));