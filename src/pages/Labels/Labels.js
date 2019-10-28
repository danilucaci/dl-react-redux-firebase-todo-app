import React from "react";
import { Link } from "react-router-dom";

import "./Labels.styles.scss";
import Main from "../../components/Main/Main";
import AddNew from "../../components/AddNew/AddNew";

function Labels({ labels, openAddLabelModal }) {
  return (
    <Main>
      <section className="Section">
        <header className="Labels__Section__Header">
          <h1 className="Section__Title">Labels</h1>
          <AddNew onClick={() => openAddLabelModal()}>Add label</AddNew>
        </header>
        {labels && labels.length ? (
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
          <p>Add a label to get started</p>
        )}
      </section>
    </Main>
  );
}

export default Labels;
