import TodosTypes from "./todos-types";

const INITIAL_STATE = {
  byID: {},
};

const todosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TodosTypes.SET_TODOS: {
      return {
        ...state,
        byID: { ...action.payload },
      };
    }
    case TodosTypes.ADD_TODO: {
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.data.id]: {
            ...action.payload.data,
            isFocused: action.payload.shouldFocus,
          },
        },
      };
    }
    case TodosTypes.TOGGLE_TODO_HIGHLIGHT: {
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.id]: {
            ...state.byID[action.payload.id],
            isHighlighted: action.payload.isHighlighted,
          },
        },
      };
    }
    case TodosTypes.TOGGLE_TODO_FOCUS: {
      return {
        ...state,
        byID: {
          ...state.byID,
          [action.payload.id]: {
            ...state.byID[action.payload.id],
            isFocused: action.payload.isFocused,
          },
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
    case TodosTypes.REMOVE_TODO: {
      const { [action.payload]: removedTodo, ...otherTodos } = state.byID;

      return {
        ...state,
        byID: {
          ...otherTodos,
        },
      };
    }
    default:
      return state;
  }
};

export default todosReducer;
