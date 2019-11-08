import React from "react";
import { node, shape, bool } from "prop-types";
import classnames from "classnames";

import "./DashboardMain.styles.scss";
import SidebarContainer from "../../redux/containers/components/SidebarContainer";
import PageSkeletonContainer from "../../redux/containers/components/PageSkeletonContainer";

function DashboardMain({
  children,
  appData: { initialDataLoaded = false } = {},
}) {
  const mainClasses = classnames({
    DashboardMain: true,
    col: true,
    [`col-l-5`]: true,
    [`col-xl-8`]: true,
  });

  return (
    <div className="row row--contain-10">
      <SidebarContainer />
      <main className={mainClasses}>
        {initialDataLoaded ? children : <PageSkeletonContainer />}
      </main>
    </div>
  );
}

DashboardMain.propTypes = {
  children: node.isRequired,
  appData: shape({
    initialDataLoaded: bool.isRequired,
  }),
};

export default DashboardMain;
