import React from "react";
import { func, array } from "prop-types";

import "./Projects.styles.scss";
import AppMainContainer from "../../redux/containers/components/AppMainContainer";
import AddNew from "../../components/AddNew/AddNew";
import ProjectsCardContainer from "../../redux/containers/components/ProjectsCardContainer";
import withProtectedRoute from "../../hoc/withProtectedRoute";

function Projects({ projects = null, openAddProjectModal }) {
  return (
    <AppMainContainer>
      <section className="Section">
        <header className="Projects__Section__Header">
          <h1 className="Section__Title">Projects</h1>
          <AddNew onClick={() => openAddProjectModal()}>Add project</AddNew>
        </header>
        {projects && projects.length ? (
          <div className="row-nested">
            {projects.map((project) => (
              <ProjectsCardContainer key={project.id} projectID={project.id} />
            ))}
          </div>
        ) : (
          <p>Add a project to get started</p>
        )}
      </section>
    </AppMainContainer>
  );
}

Projects.propTypes = {
  projects: array.isRequired,
  openAddProjectModal: func.isRequired,
};

export default withProtectedRoute()(Projects);
