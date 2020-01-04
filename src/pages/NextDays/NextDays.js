import React from "react";
import { func, array } from "prop-types";

import "./NextDays.styles.scss";
import DashboardMainContainer from "../../redux/containers/components/DashboardMainContainer";
import HeaderContainer from "../../redux/containers/components/HeaderContainer";
import Todo from "../../components/Todo/Todo";
import AddNew from "../../components/AddNew/AddNew";
import AriaText from "../../components/AriaText/AriaText";
import { FALLBACK_FOCUS_BUTTON } from "../../constants/ui";

import {
  formatTodaySectionDate,
  formatAndAddDate,
  formatAndAddDay,
} from "../../utils/dates";
import withProtectedRoute from "../../hoc/withProtectedRoute";
import SEO from "../../components/SEO/SEO";
import seo from "../../utils/seo";

export function RenderTodayDateTime() {
  const { todayDate, todayFormattedDate } = formatTodaySectionDate();

  return (
    <time dateTime={todayDate} className="Section__Date">
      {todayFormattedDate}
    </time>
  );
}

export function RenderNextDaysDateTime(dateCount) {
  const { dateAdded, formattedDate } = formatAndAddDate(dateCount);
  return (
    <time dateTime={dateAdded} className="Section__Date">
      {formattedDate}
    </time>
  );
}

function NextDays({
  overdueTodos,
  todayTodos,
  nextDaysPlus1Todos,
  nextDaysPlus2Todos,
  nextDaysPlus3Todos,
  nextDaysPlus4Todos,
  nextDaysPlus5Todos,
  nextDaysPlus6Todos,
  openAddTodoModal,
}) {
  return (
    <>
      <SEO title={seo.pages.nextDays.title} />
      <HeaderContainer />
      <DashboardMainContainer>
        <h1 className="Page__Title">Next 7 days</h1>
        {overdueTodos && overdueTodos.length ? (
          <section
            className="Section"
            aria-labelledby={`next-7-days-overdue-todos-label`}
          >
            <header className="Section__Header">
              <h2
                className="Section__Title"
                id={`next-7-days-overdue-todos-label`}
              >
                Overdue
                <AriaText> todos</AriaText>
              </h2>
            </header>
            <ul
              className="Section__Todos__List"
              aria-label="next 7 days overdue todos"
            >
              {overdueTodos &&
                overdueTodos.map((todoID, index) => (
                  <Todo
                    key={todoID}
                    todoID={todoID}
                    prev={overdueTodos[index - 1]}
                    next={overdueTodos[index + 1]}
                  />
                ))}
            </ul>
          </section>
        ) : null}
        <section className="Section" aria-labelledby={`today-todos-label`}>
          <header className="Section__Header">
            <h2 className="Section__Title" id={`today-todos-label`}>
              Today
              <AriaText> todos</AriaText>
            </h2>
            {RenderTodayDateTime()}
          </header>
          <ul className="Section__Todos__List" aria-label="today todos">
            {todayTodos &&
              todayTodos.map((todoID, index) => (
                <Todo
                  key={todoID}
                  todoID={todoID}
                  prev={todayTodos[index - 1]}
                  next={todayTodos[index + 1]}
                />
              ))}
          </ul>
          <AddNew
            additionalClasses="Section__AddNew"
            onClick={() => openAddTodoModal()}
            id={`#${FALLBACK_FOCUS_BUTTON}`}
          >
            Add todo
          </AddNew>
        </section>
        <section className="Section" aria-labelledby={`tomorrow-todos-label`}>
          <header className="Section__Header">
            <h2 className="Section__Title" id={`tomorrow-todos-label`}>
              Tomorrow
              <AriaText> todos</AriaText>
            </h2>
            {RenderNextDaysDateTime(1)}
          </header>
          <ul className="Section__Todos__List" aria-label="tomorrow todos">
            {nextDaysPlus1Todos &&
              nextDaysPlus1Todos.map((todoID, index) => (
                <Todo
                  key={todoID}
                  todoID={todoID}
                  prev={nextDaysPlus1Todos[index - 1]}
                  next={nextDaysPlus1Todos[index + 1]}
                />
              ))}
          </ul>
          <AddNew
            additionalClasses="Section__AddNew"
            onClick={() => openAddTodoModal()}
          >
            Add todo
          </AddNew>
        </section>
        <section
          className="Section"
          aria-labelledby={`${formatAndAddDay(2)}-todos-label`}
        >
          <header className="Section__Header">
            <h2
              className="Section__Title"
              id={`${formatAndAddDay(2)}-todos-label`}
            >
              {formatAndAddDay(2)} <AriaText> todos</AriaText>
            </h2>
            {RenderNextDaysDateTime(2)}
          </header>
          <ul
            className="Section__Todos__List"
            aria-label={`${formatAndAddDay(2)} todos`}
          >
            {nextDaysPlus2Todos &&
              nextDaysPlus2Todos.map((todoID, index) => (
                <Todo
                  key={todoID}
                  todoID={todoID}
                  prev={nextDaysPlus2Todos[index - 1]}
                  next={nextDaysPlus2Todos[index + 1]}
                />
              ))}
          </ul>
          <AddNew
            additionalClasses="Section__AddNew"
            onClick={() => openAddTodoModal()}
          >
            Add todo
          </AddNew>
        </section>
        <section
          className="Section"
          aria-labelledby={`${formatAndAddDay(3)}-todos-label`}
        >
          <header className="Section__Header">
            <h2
              className="Section__Title"
              id={`${formatAndAddDay(3)}-todos-label`}
            >
              {formatAndAddDay(3)} <AriaText> todos</AriaText>
            </h2>
            {RenderNextDaysDateTime(3)}
          </header>
          <ul
            className="Section__Todos__List"
            aria-label={`${formatAndAddDay(3)} todos`}
          >
            {nextDaysPlus3Todos &&
              nextDaysPlus3Todos.map((todoID, index) => (
                <Todo
                  key={todoID}
                  todoID={todoID}
                  prev={nextDaysPlus3Todos[index - 1]}
                  next={nextDaysPlus3Todos[index + 1]}
                />
              ))}
          </ul>
          <AddNew
            additionalClasses="Section__AddNew"
            onClick={() => openAddTodoModal()}
          >
            Add todo
          </AddNew>
        </section>
        <section
          className="Section"
          aria-labelledby={`${formatAndAddDay(4)}-todos-label`}
        >
          <header className="Section__Header">
            <h2
              className="Section__Title"
              id={`${formatAndAddDay(4)}-todos-label`}
            >
              {formatAndAddDay(4)} <AriaText> todos</AriaText>
            </h2>
            {RenderNextDaysDateTime(4)}
          </header>
          <ul
            className="Section__Todos__List"
            aria-label={`${formatAndAddDay(4)} todos`}
          >
            {nextDaysPlus4Todos &&
              nextDaysPlus4Todos.map((todoID, index) => (
                <Todo
                  key={todoID}
                  todoID={todoID}
                  prev={nextDaysPlus4Todos[index - 1]}
                  next={nextDaysPlus4Todos[index + 1]}
                />
              ))}
          </ul>
          <AddNew
            additionalClasses="Section__AddNew"
            onClick={() => openAddTodoModal()}
          >
            Add todo
          </AddNew>
        </section>
        <section
          className="Section"
          aria-labelledby={`${formatAndAddDay(5)}-todos-label`}
        >
          <header className="Section__Header">
            <h2
              className="Section__Title"
              id={`${formatAndAddDay(5)}-todos-label`}
            >
              {formatAndAddDay(5)} <AriaText> todos</AriaText>
            </h2>
            {RenderNextDaysDateTime(5)}
          </header>
          <ul
            className="Section__Todos__List"
            aria-label={`${formatAndAddDay(5)} todos`}
          >
            {nextDaysPlus5Todos &&
              nextDaysPlus5Todos.map((todoID, index) => (
                <Todo
                  key={todoID}
                  todoID={todoID}
                  prev={nextDaysPlus5Todos[index - 1]}
                  next={nextDaysPlus5Todos[index + 1]}
                />
              ))}
          </ul>
          <AddNew
            additionalClasses="Section__AddNew"
            onClick={() => openAddTodoModal()}
          >
            Add todo
          </AddNew>
        </section>
        <section
          className="Section"
          aria-labelledby={`${formatAndAddDay(6)}-todos-label`}
        >
          <header className="Section__Header">
            <h2
              className="Section__Title"
              id={`${formatAndAddDay(6)}-todos-label`}
            >
              {formatAndAddDay(6)} <AriaText> todos</AriaText>
            </h2>
            {RenderNextDaysDateTime(6)}
          </header>
          <ul
            className="Section__Todos__List"
            aria-label={`${formatAndAddDay(6)} todos`}
          >
            {nextDaysPlus6Todos &&
              nextDaysPlus6Todos.map((todoID, index) => (
                <Todo
                  key={todoID}
                  todoID={todoID}
                  prev={nextDaysPlus6Todos[index - 1]}
                  next={nextDaysPlus6Todos[index + 1]}
                />
              ))}
          </ul>
          <AddNew
            additionalClasses="Section__AddNew"
            onClick={() => openAddTodoModal()}
          >
            Add todo
          </AddNew>
        </section>
      </DashboardMainContainer>
    </>
  );
}

NextDays.propTypes = {
  overdueTodos: array.isRequired,
  todayTodos: array.isRequired,
  nextDaysPlus1Todos: array.isRequired,
  nextDaysPlus2Todos: array.isRequired,
  nextDaysPlus3Todos: array.isRequired,
  nextDaysPlus4Todos: array.isRequired,
  nextDaysPlus5Todos: array.isRequired,
  nextDaysPlus6Todos: array.isRequired,
  openAddTodoModal: func.isRequired,
};

export default withProtectedRoute()(NextDays);
