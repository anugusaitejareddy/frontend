import React from "react";
import { WorkoutsContext } from "../context/WorkoutContext";

function WorkoutForm() {
  const [title, setTitle] = React.useState("");
  const [load, setLoad] = React.useState("");
  const [reps, setReps] = React.useState("");
  const [error, setError] = React.useState(null);
  const [emptyFields, setEmptyFields] = React.useState([]);
  const { dispatch } = React.useContext(WorkoutsContext);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const workout = { title, load, reps };
        const response = await fetch("/api/workouts", {
          method: "POST",
          body: JSON.stringify(workout),
          headers: {
            "Content-type": "application/json",
          },
        });
        const json = await response.json();

        if (!response.ok) {
          setError(json.error);
          setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
          setLoad("");
          setTitle("");
          setReps("");
          setError(null);
          dispatch({ type: "CREATE_WORKOUT", payload: workout });
        }
      }}
    >
      <h3>Add a new Workout: </h3>
      <label>
        Exercise Title:
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className={emptyFields.includes("title") ? "error" : ""}
        />
      </label>
      <label>
        Load (in Kg):
        <input
          type="number"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
          className={emptyFields.includes("load") ? "error" : ""}
        />
      </label>
      <label>
        Number of Reps:
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
      </label>
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default WorkoutForm;
