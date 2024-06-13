import React from "react";
import { WorkoutsContext } from "../context/WorkoutContext";

function useWorkoutContext() {
  const context = React.useContext(WorkoutsContext);
  //   console.log(context);
  return context;
}

export default useWorkoutContext;
