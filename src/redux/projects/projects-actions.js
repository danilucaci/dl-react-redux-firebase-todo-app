import ProjectsTypes from "./projects-types";

export const setProjects = (projects) => ({
  type: ProjectsTypes.SET_PROJECTS,
  payload: projects,
});

export const updateProjects = (projects) => ({
  type: ProjectsTypes.UPDATE_PROJECTS,
  payload: projects,
});

export const addProject = (project) => ({
  type: ProjectsTypes.ADD_PROJECT,
  payload: project,
});
