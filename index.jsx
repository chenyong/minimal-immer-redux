import React from "react";
import produce from "immer";
import { render } from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";

// pass in initial-state and action, get next-state
let reducerTodos = (state0 = [], action) => {
  return produce(state0, state => {
    switch (action.type) {
      case "ADD_TODO":
        state.push({
          id: action.id,
          text: action.text,
          completed: false
        });
        break;
      case "TOGGLE_TODO":
        state.forEach(todo => {
          if (todo.id === action.id) {
            todo.completed = !todo.completed;
          }
        });
        break;
      default:
        break;
    }
  });
};

// pass in initial-state and action, get next-state
let reducerFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

let actionToggle = id => ({
  type: "TOGGLE_TODO",
  id
});

let actionAddTodo = text => ({
  type: "ADD_TODO",
  id: Date.now(),
  text
});

let actionSetFilter = filter => ({
  type: "SET_FILTER",
  filter
});

let store = createStore(
  combineReducers({
    reducerTodos,
    reducerFilter
  })
);

class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };
  }

  render() {
    return (
      <div>
        <div>
          <input value={this.state.text} onChange={this.onChange.bind(this)} />
          <button onClick={this.onClick.bind(this)}>Add</button>
        </div>
        <div>
          {this.props.todos.map(todo => {
            return <div key={todo.id}>todo</div>;
          })}
        </div>
      </div>
    );
  }

  onChange(event) {
    this.setState({ text: event.target.value });
  }

  onClick(event) {
    this.props.addTodo(this.state.text);
    this.setState({ text: "" });
  }
}

// connect store and actions with component ptops
let ConnectedContainer = connect(
  state => ({ todos: state.todos }),
  dispatch => ({
    toggle: id => {
      dispatch(actionToggle(id));
    },
    addTodo: text => {
      dispatch(actionAddTodo(text));
    }
  })
)(Container);

render(
  <Provider store={store}>
    <ConnectedContainer />
  </Provider>,
  document.querySelector(".app")
);
