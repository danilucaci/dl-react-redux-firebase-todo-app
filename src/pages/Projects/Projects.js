import React from "react";
import { Link } from "react-router-dom";

import "./Projects.styles.scss";
import Main from "../../components/Main/Main";
import AddNew from "../../components/AddNew/AddNew";

function Projects({ projects, openAddProjectModal }) {
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
              <Link
                to={`/project/${project.name.toLowerCase()}`}
                className="col col-xl-6 Project__Card"
                key={project.id}
              >
                <div className="Project__Card__Header">
                  <h2 className="Project__Card__Title">{project.name}</h2>
                  <svg
                    className="Project__Card__Icon"
                    fill={project.color.colorValue}
                  >
                    <use xlinkHref="#color" />
                  </svg>
                </div>
                <p className="Project__Card__Count">
                  {project.todosCount} todos
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p>Add a project to get started</p>
        )}
      </section>
    </Main>
  );
}

export default Projects;
