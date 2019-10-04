import { createSelector } from "reselect";

export const selectProjects = (state) => state.projects;

export const projectsSelector = createSelector(
  [selectProjects],
  (projects) => projects.projects,
);
