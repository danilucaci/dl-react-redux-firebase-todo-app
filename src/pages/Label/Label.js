import React from "react";
import classnames from "classnames";

import "./Label.styles.scss";
import Main from "../../components/Main/Main";

function Label(props) {
  const { match } = props;

  return (
    <Main>
      <section className="Section">
        <h1>Label page</h1>
        <p>{match.params.labelID}</p>
      </section>
    </Main>
  );
}

export default Label;
