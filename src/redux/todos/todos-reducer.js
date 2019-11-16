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
