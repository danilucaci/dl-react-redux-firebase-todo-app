import ProjectsTypes from "./projects-types";

export const updateProjects = ({ projects }) => ({
  type: ProjectsTypes.UPDATE_PROJECTS,
  payload: projects,
});

export const addProject = (project) => ({
  type: ProjectsTypes.ADD_PROJECT,
  payload: project,
});
