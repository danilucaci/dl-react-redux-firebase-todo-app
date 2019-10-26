import React from "react";
import { string } from "prop-types";
import { connect } from "react-redux";
import classNames from "classnames";

import "./MenuButton.styles.scss";
import { getClassesFromProps } from "../../utils/helpers";
import { menuSelector } from "../../redux/localState/localState-selectors";
import { toggleMenu } from "../../redux/localState/localState-actions";

function MenuButton({ additionalClasses, menu, dispatch, ...props }) {
  const addedClasses = getClassesFromProps(additionalClasses);
  const { menuOpen } = menu;

  const buttonClassNames = classNames({
    [`MenuButton--Medium `]: true,
    MenuButton: true,
    ...addedClasses,
  });

  const svgClassNames = classNames({
    MenuButton__Icon: true,
    [`MenuButton__Icon--Rotate`]: menuOpen,
  });

  return (
    <button
      className={buttonClassNames}
      aria-label={`${menuOpen ? `Close` : `Open`} the navigation sidebar.`}
      aria-haspopup="true"
      onClick={() => dispatch(toggleMenu())}
      {...props}
    >
      <svg className={svgClassNames}>
        {menuOpen ? <use xlinkHref={`#close`} /> : <use xlinkHref={`#menu`} />}
      </svg>
    </button>
  );
}

MenuButton.propTypes = {
  additionalClasses: string,
};

MenuButton.defaultProps = {
  additionalClasses: null,
};

const mapStateToProps = (state) => ({
  menu: menuSelector(state),
});

export default connect(mapStateToProps)(MenuButton);
