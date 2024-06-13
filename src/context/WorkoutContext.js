import React from "react";

export const WorkoutsContext = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_WORKOUT":
      return { workouts: [action.payload, ...state.workouts] };
    case "SET_WORKOUTS":
      return { workouts: action.payload };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {
    workouts: null,
  });
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
