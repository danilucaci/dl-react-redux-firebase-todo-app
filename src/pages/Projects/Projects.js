import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./Projects.styles.scss";
import Main from "../../components/Main/Main";
import AddNew from "../../components/AddNew/AddNew";

import { projectsSelector } from "../../redux/projects/projects-selectors";
import { openAddProjectModal } from "../../redux/localState/localState-actions";

function Projects({ projects, dispatch }) {
  return (
    <Main>
      <section className="Section">
        <header className="Projects__Section__Header">
          <h1 className="Section__Title">Projects</h1>
          <AddNew onClick={() => dispatch(openAddProjectModal())}>
            Add project
          </AddNew>
        </header>
        {projects ? (
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
          <p>TODO</p>
        )}
      </section>
    </Main>
  );
}

export const mapStateToProps = (state) => ({
  projects: projectsSelector(state),
});

export default connect(mapStateToProps)(Projects);
