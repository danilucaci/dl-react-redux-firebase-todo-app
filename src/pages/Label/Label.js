import React from "react";
import { connect } from "react-redux";

import Main from "../../components/Main/Main";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";

import {
  labelOverdueTodosSelector,
  labelNotOverdueTodosSelector,
  labelSelector,
} from "../../redux/labels/labels-selectors";

function Label(props) {
  const { labelTodos, labelOverdueTodos, label } = props;

  return (
    <Main>
      <h1 className="Page__Title Page__Title--Label">{label.name}</h1>
      {labelOverdueTodos.length ? (
        <section className="Section">
          <header className="Section__Header">
            <h2 className="Section__Title">Overdue</h2>
          </header>
          <ul className="Section__Todos__List">
            {labelOverdueTodos &&
              labelOverdueTodos.map((todo) => (
                <Todo key={todo.id} todoID={todo.id} />
              ))}
          </ul>
        </section>
      ) : null}

      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">Todos</h2>
        </header>
        <ul className="Section__Todos__List">
          {labelTodos &&
            labelTodos.map((todo) => <Todo key={todo.id} todoID={todo.id} />)}
        </ul>
        <AddNew additionalClasses="Section__AddNew">Add todo</AddNew>
      </section>
    </Main>
  );
}

const mapStateToProps = (state, ownProps) => ({
  labelOverdueTodos: labelOverdueTodosSelector(state, ownProps.labelID),
  labelTodos: labelNotOverdueTodosSelector(state, ownProps.labelID),
  label: labelSelector(state, ownProps.labelID),
});

export default connect(mapStateToProps)(Label);
