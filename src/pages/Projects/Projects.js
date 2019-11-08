import React from "react";
import { func, array } from "prop-types";

import "./Projects.styles.scss";
import Main from "../../components/Main/Main";
import AddNew from "../../components/AddNew/AddNew";
import ProjectsCardContainer from "../../redux/containers/components/ProjectsCardContainer";

function Projects({ projects = null, openAddProjectModal }) {
  return (
    <Main>
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
    </Main>
  );
}

Projects.propTypes = {
  projects: array.isRequired,
  openAddProjectModal: func.isRequired,
};

export default Projects;
