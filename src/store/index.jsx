import { createStore } from "redux";

const INICIAL_STATE = {
  tasks: [],
};

// REDUCER - Responsável por manipular o estado
function todo(state = INICIAL_STATE, action) {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "REMOVE_TASK":
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        tasks: updatedTasks,
      };

    default:
      return state;
  }
}

const store = createStore(todo);

export default store;
