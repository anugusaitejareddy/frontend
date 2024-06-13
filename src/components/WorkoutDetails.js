import useWorkoutContext from "../hooks/useWorkoutContext";

function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();

  const handleDelete = async () => {
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (Kg): </strong>
        {workout.reps}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.load}
      </p>
      <span onClick={handleDelete}>delete</span>
    </div>
  );
}

export default WorkoutDetails;
