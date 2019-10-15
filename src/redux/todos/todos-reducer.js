import TodosTypes from "./todos-types";

const INITIAL_STATE = {
  todos: [
    {
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
      name: "Learn React",
      dueDate: new Date(),
      completed: false,
      overdue: false,
      project: {
        projectID: new Date() + Math.random(),
        name: "Personal",
        colorName: "Blue",
        colorValue: "#4B75F6",
      },
      labels: [
        {
          labelID: new Date() + Math.random(),
          name: "waiting",
          colorName: "Orange",
          colorValue: "#F19D4B",
        },
      ],
    },
    {
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
      name: "Finish design",
      dueDate: null,
      completed: true,
      overdue: false,
      project: {
        projectID: new Date() + Math.random(),
        name: "Personal",
        colorName: "Blue",
        colorValue: "#4B75F6",
      },
      labels: null,
    },
    {
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
      name: "Study Maths",
      dueDate: null,
      completed: true,
      overdue: false,
      project: {
        projectID: new Date() + Math.random(),
        name: "Personal",
        colorName: "Blue",
        colorValue: "#4B75F6",
      },
      labels: [
        {
          labelID: new Date() + Math.random(),
          name: "waiting",
          colorName: "Orange",
          colorValue: "#F19D4B",
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
