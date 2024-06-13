import React from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutContext from "../hooks/useWorkoutContext";

function Home() {
  const { workouts, dispatch } = useWorkoutContext();

  React.useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();
      // console.log(json);
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };

    fetchWorkouts();
  }, []);
  console.log(workouts);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => <WorkoutDetails workout={workout} />)}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
