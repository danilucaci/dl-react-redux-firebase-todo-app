import TodosTypes from "./todos-types";

const INITIAL_STATE = {
  todos: [
    {
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
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
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
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
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
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
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
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
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
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
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
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
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
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
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
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
      id: new Date() + Math.random(),
      uid: new Date() + Math.random(),
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
    default:
      return state;
  }
};

export default todosReducer;
