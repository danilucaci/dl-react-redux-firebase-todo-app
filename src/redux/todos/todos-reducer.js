import TodosTypes from "./todos-types";
import uuid from "uuid";

const INITIAL_STATE = {
  todos: [
    {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: "Learn React",
      dueDate: new Date("2019-10-12 15:00"),
      completed: false,
      project: {
        projectID: "project-01",
        name: "Inbox",
        colorName: "Grey",
        colorValue: "#B8B8B8",
      },
      labels: [
        {
          labelID: "label-01",
          name: "pending",
          colorName: "Orange",
          colorValue: "#F19D4B",
        },
      ],
    },
    {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: "Finish design",
      dueDate: new Date("2019-10-18"),
      completed: false,
      project: {
        projectID: "project-01",
        name: "Inbox",
        colorName: "Grey",
        colorValue: "#B8B8B8",
      },
      labels: null,
    },
    {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: "Study Maths",
      dueDate: new Date("2019-10-17 11:00"),
      completed: false,
      project: {
        projectID: "project-02",
        name: "Personal",
        colorName: "Blue",
        colorValue: "#4B75F6",
      },
      labels: [
        {
          labelID: "label-01",
          name: "pending",
          colorName: "Orange",
          colorValue: "#F19D4B",
        },
      ],
    },
    {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: "Learn Node",
      dueDate: null,
      completed: false,
      project: {
        projectID: "project-02",
        name: "Personal",
        colorName: "Blue",
        colorValue: "#4B75F6",
      },
      labels: [
        {
          labelID: "label-01",
          name: "pending",
          colorName: "Orange",
          colorValue: "#F19D4B",
        },
      ],
    },
    {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: "Todo 001",
      dueDate: new Date("2019-10-15 21:00"),
      completed: false,
      project: {
        projectID: "project-02",
        name: "Personal",
        colorName: "Blue",
        colorValue: "#4B75F6",
      },
      labels: [
        {
          labelID: "label-01",
          name: "pending",
          colorName: "Orange",
          colorValue: "#F19D4B",
        },
        {
          labelID: "label-02",
          name: "soon",
          colorName: "Teal",
          colorValue: "#428DAA",
        },
      ],
    },
    {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: "Todo 002",
      dueDate: new Date("2019-10-1"),
      completed: false,
      project: {
        projectID: "project-02",
        name: "Personal",
        colorName: "Blue",
        colorValue: "#4B75F6",
      },
      labels: null,
    },
    {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: "Todo 003",
      dueDate: new Date("2019-10-22"),
      completed: false,
      project: {
        projectID: "project-02",
        name: "Personal",
        colorName: "Blue",
        colorValue: "#4B75F6",
      },
      labels: [
        {
          labelID: "label-02",
          name: "soon",
          colorName: "Teal",
          colorValue: "#428DAA",
        },
      ],
    },
    {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: "Todo 004",
      dueDate: new Date("2019-10-19 21:00"),
      completed: false,
      project: {
        projectID: "project-03",
        name: "Work",
        colorName: "Mint Green",
        colorValue: "#82CABC",
      },
      labels: [
        {
          labelID: "label-02",
          name: "soon",
          colorName: "Teal",
          colorValue: "#428DAA",
        },
      ],
    },
    {
      id: uuid.v4(),
      uid: uuid.v4(),
      name: "Todo 005",
      dueDate: new Date("2019-10-16 20:00"),
      completed: false,
      project: {
        projectID: "project-03",
        name: "Work",
        colorName: "Mint Green",
        colorValue: "#82CABC",
      },
      labels: [
        {
          labelID: "label-01",
          name: "pending",
          colorName: "Orange",
          colorValue: "#F19D4B",
        },
        {
          labelID: "label-02",
          name: "soon",
          colorName: "Teal",
          colorValue: "#428DAA",
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
    case TodosTypes.TOGGLE_TODO_COMPLETED: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        }),
      };
    }
    default:
      return state;
  }
};

export default todosReducer;
