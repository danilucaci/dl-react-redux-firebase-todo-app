import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Labels.styles.scss";
import Main from "../../components/Main/Main";
import AddNew from "../../components/AddNew/AddNew";

import { labelsSelector } from "../../redux/labels/labels-selectors";

function Labels(props) {
  const { labels } = props;

  return (
    <Main>
      <section className="Section">
        <header className="Labels__Section__Header">
          <h1 className="Section__Title">Labels</h1>
          <AddNew>Add label</AddNew>
        </header>
        {labels ? (
          <div className="row-nested">
            {labels.map((label) => (
              <Link
                to={`/label/${label.name.toLowerCase()}`}
                className="col col-xl-6 Project__Card"
                key={label.id}
              >
                <div className="Project__Card__Header">
                  <h2 className="Project__Card__Title">{label.name}</h2>
                  <svg
                    className="Project__Card__Icon"
                    fill={label.color.colorValue}
                  >
                    <use xlinkHref="#color" />
                  </svg>
                </div>
                <p className="Project__Card__Count">{label.todosCount} todos</p>
              </Link>
            ))}
          </div>
        ) : (
          <p>TODO</p>
        )}
      </section>
    </Main>
  );
}

export const mapStateToProps = (state) => ({
  labels: labelsSelector(state),
});

export default connect(mapStateToProps)(Labels);
