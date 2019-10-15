import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { addDays } from "date-fns";

import "./Todos.styles.scss";

import Main from "../../components/Main/Main";

import { todosSelector } from "../../redux/todos/todos-selectors";
import { formatSectionDate, formatTomorrowDate } from "../../utils/dates";

function Todos(props) {
  const { todos } = props;

  const { todayDate, todayFormattedDate } = formatSectionDate();
  const { tomorrowDate, tomorrowFormattedDate } = formatTomorrowDate();

  return (
    <Main>
      <section className="Section">
        <header className="Section__Header">
          <h1 className="Section__Title">Today</h1>
          <time dateTime={todayDate} className="Section__Date">
            {formattedTodayDate}
          </time>
          <NavLink to="/today" className="Section__Link">
            See all
          </NavLink>
        </header>
      </section>
      <section className="Section">
        <header className="Section__Header">
          <h2 className="Section__Title">Tomorrow</h2>
          <time dateTime={tomorrowDate} className="Section__Date">
            {formattedTomorrowDate}
          </time>
          <NavLink to="/today" className="Section__Link">
            See all
          </NavLink>
        </header>
      </section>
    </Main>
  );
}

const mapStateToProps = (state) => ({
  todos: todosSelector(state),
});

export default connect(mapStateToProps)(Todos);
