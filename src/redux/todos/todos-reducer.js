import TodosTypes from "./todos-types";

const INITIAL_STATE = {
  todos: {
    byID: {
      "e0f20cc7-8096-4c79-86ba-3d71d9dfd743": {
        id: "e0f20cc7-8096-4c79-86ba-3d71d9dfd743",
        uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
        name: "Learn React",
        dueDate: "2019-10-12T13:00:00.000Z",
        completed: false,
        project: {
          projectID: "1ac24680-1369-482e-a021-8f9db9e0b509",
          name: "Inbox",
          colorName: "Grey",
          colorValue: "#B8B8B8",
        },
        labels: [
          {
            labelID: "fb1d5a40-b853-434d-a3e3-0f19eb4e9430",
            name: "pending",
            colorName: "Orange",
            colorValue: "#F19D4B",
          },
        ],
      },
      "cef5cc99-e3e5-44ae-94a0-1ba11741b4fd": {
        id: "cef5cc99-e3e5-44ae-94a0-1ba11741b4fd",
        uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
        name: "Finish design",
        dueDate: "2019-10-18T00:00:00.000Z",
        completed: false,
        project: {
          projectID: "1ac24680-1369-482e-a021-8f9db9e0b509",
          name: "Inbox",
          colorName: "Grey",
          colorValue: "#B8B8B8",
        },
        labels: null,
      },
      "1c9d5374-63d0-4260-a6a3-ce32e47628ff": {
        id: "1c9d5374-63d0-4260-a6a3-ce32e47628ff",
        uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
        name: "Study Maths",
        dueDate: null,
        completed: false,
        project: {
          projectID: "b6eef00f-a7df-4df6-ac57-f1706da08d21",
          name: "Personal",
          colorName: "Blue",
          colorValue: "#4B75F6",
        },
        labels: [
          {
            labelID: "fb1d5a40-b853-434d-a3e3-0f19eb4e9430",
            name: "pending",
            colorName: "Orange",
            colorValue: "#F19D4B",
          },
        ],
      },
      "f5a3b04f-d27b-4f4d-9ef1-ae37c6b34834": {
        id: "f5a3b04f-d27b-4f4d-9ef1-ae37c6b34834",
        uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
        name: "Learn Node",
        dueDate: null,
        completed: false,
        project: {
          projectID: "b6eef00f-a7df-4df6-ac57-f1706da08d21",
          name: "Personal",
          colorName: "Blue",
          colorValue: "#4B75F6",
        },
        labels: [
          {
            labelID: "fb1d5a40-b853-434d-a3e3-0f19eb4e9430",
            name: "pending",
            colorName: "Orange",
            colorValue: "#F19D4B",
          },
        ],
      },
      "e3ef0e3c-8ac6-4c10-8b7f-1063a6fda1bd": {
        id: "e3ef0e3c-8ac6-4c10-8b7f-1063a6fda1bd",
        uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
        name: "Todo 001",
        dueDate: "2019-10-15T19:00:00.000Z",
        completed: false,
        project: {
          projectID: "b6eef00f-a7df-4df6-ac57-f1706da08d21",
          name: "Personal",
          colorName: "Blue",
          colorValue: "#4B75F6",
        },
        labels: [
          {
            labelID: "fb1d5a40-b853-434d-a3e3-0f19eb4e9430",
            name: "pending",
            colorName: "Orange",
            colorValue: "#F19D4B",
          },
          {
            labelID: "d0fd61ff-87e0-4c36-9386-dada2cdadb56",
            name: "soon",
            colorName: "Teal",
            colorValue: "#428DAA",
          },
        ],
      },
      "da48547a-6bb0-4cf5-9557-3887a8aa1975": {
        id: "da48547a-6bb0-4cf5-9557-3887a8aa1975",
        uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
        name: "Todo 002",
        dueDate: "2019-09-30T22:00:00.000Z",
        completed: false,
        project: {
          projectID: "b6eef00f-a7df-4df6-ac57-f1706da08d21",
          name: "Personal",
          colorName: "Blue",
          colorValue: "#4B75F6",
        },
        labels: null,
      },
      "65be15ad-8a98-4fc7-9f09-b837e890a9bb": {
        id: "65be15ad-8a98-4fc7-9f09-b837e890a9bb",
        uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
        name: "Todo 003",
        dueDate: "2019-10-22T00:00:00.000Z",
        completed: false,
        project: {
          projectID: "b6eef00f-a7df-4df6-ac57-f1706da08d21",
          name: "Personal",
          colorName: "Blue",
          colorValue: "#4B75F6",
        },
        labels: [
          {
            labelID: "d0fd61ff-87e0-4c36-9386-dada2cdadb56",
            name: "soon",
            colorName: "Teal",
            colorValue: "#428DAA",
          },
        ],
      },
      "f7f48a73-5dbc-4d92-87c3-c7a47214dd08": {
        id: "f7f48a73-5dbc-4d92-87c3-c7a47214dd08",
        uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
        name: "Todo 004",
        dueDate: "2019-10-19T19:00:00.000Z",
        completed: false,
        project: {
          projectID: "420aabac-8b82-46fd-9125-b67b4ad05147",
          name: "Work",
          colorName: "Mint Green",
          colorValue: "#82CABC",
        },
        labels: [
          {
            labelID: "d0fd61ff-87e0-4c36-9386-dada2cdadb56",
            name: "soon",
            colorName: "Teal",
            colorValue: "#428DAA",
          },
        ],
      },
      "a62e5d6e-ee43-4d7d-879e-29b8ddb673e2": {
        id: "a62e5d6e-ee43-4d7d-879e-29b8ddb673e2",
        uid: "d0382da9-85cd-4787-b4d3-1dbb9c35e607",
        name: "Todo 005",
        dueDate: "2019-10-16T18:00:00.000Z",
        completed: false,
        project: {
          projectID: "420aabac-8b82-46fd-9125-b67b4ad05147",
          name: "Work",
          colorName: "Mint Green",
          colorValue: "#82CABC",
        },
        labels: [
          {
            labelID: "fb1d5a40-b853-434d-a3e3-0f19eb4e9430",
            name: "pending",
            colorName: "Orange",
            colorValue: "#F19D4B",
          },
          {
            labelID: "e56b81a2-af3b-4364-8dbb-e1ed6e5edeec",
            name: "relax",
            colorName: "Green",
            colorValue: "#4B9144",
          },
        ],
      },
    },
  },
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
      const todo = state.todos.byID[action.payload];

      return {
        ...state,
        todos: {
          ...state.todos,
          byID: {
            ...state.todos.byID,
            [action.payload]: {
              ...todo,
              completed: !todo.completed,
            },
          },
        },
      };
    }
    case TodosTypes.ADD_TODO: {
      return {
        ...state,
        todos: {
          ...state.todos,
          byID: {
            ...state.todos.byID,
            [action.payload.id]: action.payload,
          },
        },
      };
    }
    case TodosTypes.UPDATE_TODO: {
      return {
        ...state,
        todos: {
          ...state.todos,
          byID: {
            ...state.todos.byID,
            [action.payload.id]: {
              ...action.payload,
            },
          },
        },
      };
    }
    default:
      return state;
  }
};

export default todosReducer;
