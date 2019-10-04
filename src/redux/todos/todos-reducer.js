import TodosTypes from "./todos-types";

const INITIAL_STATE = {
  todos: [
    {
      id: new Date().toString(),
      uid: new Date().toString(),
      name: "Learn React",
      dueDate: new Date(),
      completed: false,
      overdue: false,
      project: {
        projectID: new Date().toString(),
        name: "Personal",
        color: "blue",
      },
      labels: [
        {
          labelID: new Date().toString(),
          name: "waiting",
          color: "purple",
        },
      ],
    },
  ],
};

const todosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TodosTypes.UPDATE_TODOS: {
      return {
        ...state,
        todos: action.payload,
      };
    }
    default:
      return state;
  }
};

export default todosReducer;
