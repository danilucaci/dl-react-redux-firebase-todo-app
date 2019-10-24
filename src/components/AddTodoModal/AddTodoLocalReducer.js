export const addTodoReducerState = {
  showProjects: false,
  initialSelectedProjectSet: false,
  showLabels: false,
  showDate: false,
  todo: {
    name: "",
    dueDate: null,
    completed: false,
    project: null,
    labels: null,
  },
};

export const AddTodoTypes = {
  TOGGLE_SHOW_PROJECTS: "TOGGLE_SHOW_PROJECTS",
  CLOSE_SHOW_PROJECTS: "CLOSE_SHOW_PROJECTS",
  SET_INITIAL_SELECTED_PROJECT: "SET_INITIAL_SELECTED_PROJECT",
  SET_SELECTED_PROJECT: "SET_SELECTED_PROJECT",
  TOGGLE_SHOW_LABELS: "TOGGLE_SHOW_LABELS",
  CLOSE_SHOW_LABELS: "CLOSE_SHOW_LABELS",
  SET_SELECTED_LABEL: "SET_SELECTED_LABEL",
  SET_SHOW_DATE: "SET_SHOW_DATE",
  CLOSE_SHOW_DATE: "CLOSE_SHOW_DATE",
  SET_SELECTED_DATE: "SET_SELECTED_DATE",
  SET_TODO_NAME: "SET_TODO_NAME",
};

export const addTodoReducer = (state, { type, payload }) => {
  switch (type) {
    case AddTodoTypes.SET_TODO_NAME: {
      return {
        ...state,
        todo: {
          ...state.todo,
          name: payload,
        },
      };
    }
    case AddTodoTypes.TOGGLE_SHOW_PROJECTS: {
      return {
        ...state,
        showProjects: !state.showProjects,
        showLabels: false,
        showDate: false,
      };
    }
    case AddTodoTypes.CLOSE_SHOW_PROJECTS: {
      return {
        ...state,
        showProjects: false,
      };
    }
    case AddTodoTypes.SET_INITIAL_SELECTED_PROJECT: {
      return {
        ...state,
        initialSelectedProjectSet: false,
        todo: {
          ...state.todo,
          project: {
            colorName: payload.color.colorName,
            colorValue: payload.color.colorValue,
            projectID: payload.id,
            name: payload.name,
          },
        },
      };
    }
    case AddTodoTypes.SET_SELECTED_PROJECT: {
      return {
        ...state,
        showProjects: !state.showProjects,
        todo: {
          ...state.todo,
          project: {
            colorName: payload.color.colorName,
            colorValue: payload.color.colorValue,
            projectID: payload.id,
            name: payload.name,
          },
        },
      };
    }
    case AddTodoTypes.SET_SHOW_LABELS: {
      return {
        ...state,
        showLabels: true,
        showProjects: false,
        showDate: false,
      };
    }
    case AddTodoTypes.CLOSE_SHOW_LABELS: {
      return {
        ...state,
        showLabels: false,
      };
    }
    case AddTodoTypes.SET_SELECTED_LABEL: {
      return {
        ...state,
        todo: {
          ...state.todo,
          labels: [...payload],
        },
      };
    }
    case AddTodoTypes.SET_SHOW_DATE: {
      return {
        ...state,
        showDate: true,
        showLabels: false,
        showProjects: false,
      };
    }
    case AddTodoTypes.CLOSE_SHOW_DATE: {
      return {
        ...state,
        showDate: false,
      };
    }
    case AddTodoTypes.SET_SELECTED_DATE: {
      return {
        ...state,
        showDate: !state.showDate,
        todo: {
          ...state.todo,
          dueDate: payload,
        },
      };
    }
    default:
      return state;
  }
};

export const setTodoNameAction = (todoName) => ({
  type: AddTodoTypes.SET_TODO_NAME,
  payload: todoName,
});

export const toggleShowProjectsAction = () => ({
  type: AddTodoTypes.TOGGLE_SHOW_PROJECTS,
});

export const closeShowProjectsAction = () => ({
  type: AddTodoTypes.CLOSE_SHOW_PROJECTS,
});

export const setInitialSelectedProjectAction = (project) => ({
  type: AddTodoTypes.SET_INITIAL_SELECTED_PROJECT,
  payload: project,
});

export const setSelectedProjectAction = (project) => ({
  type: AddTodoTypes.SET_SELECTED_PROJECT,
  payload: project,
});

export const setShowLabelsAction = () => ({
  type: AddTodoTypes.SET_SHOW_LABELS,
});

export const closeShowLabelsAction = () => ({
  type: AddTodoTypes.CLOSE_SHOW_LABELS,
});

export const setSelectedLabelAction = (label) => ({
  type: AddTodoTypes.SET_SELECTED_LABEL,
  payload: label,
});

export const setShowDateAction = () => ({
  type: AddTodoTypes.SET_SHOW_DATE,
});

export const closeShowDateAction = () => ({
  type: AddTodoTypes.CLOSE_SHOW_DATE,
});

export const setSelectedDateAction = (date) => ({
  type: AddTodoTypes.SET_SELECTED_DATE,
  payload: date,
});
