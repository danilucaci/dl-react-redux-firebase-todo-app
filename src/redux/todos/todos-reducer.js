import TodosTypes from "./todos-types";

const INITIAL_STATE = {
  byID: {},
};

const todosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TodosTypes.SET_TODOS: {
      return {
        ...state,
        byID: { ...state.byID, ...action.payload },
      };
    }
    case TodosTypes.UPDATE_TODOS: {
      return {
        ...state,
        byID: { ...state.byID, ...action.payload },
      };
    }
    case TodosTypes.TOGGLE_TODO_COMPLETED: {
      const todo = state.byID[action.payload];

      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload]: {
            ...todo,
            completed: !todo.completed,
          },
        },
      };
    }
    case TodosTypes.ADD_TODO: {
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.id]: action.payload,
        },
      };
    }
    case TodosTypes.UPDATE_TODO: {
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.id]: {
            ...action.payload,
          },
        },
      };
    }
    default:
      return state;
  }
};

export default todosReducer;
