interface Taskprop {
  id: number;
  removeOneTask: any;
  task: string;
  taskInput: any;
  checkboxInput: any;
  isChecked: boolean;
  isTaskInputComplete: boolean;
  validateInput: any;
  taskListLenght: any;
}

const Tasck = (elm: Taskprop) => {
  const {
    id,
    removeOneTask,
    task,
    taskInput,
    checkboxInput,
    isChecked,
    isTaskInputComplete,
    validateInput,
    taskListLenght,
  } = elm;

  return (
    <div className={isChecked && task.length > 2 ? "whenCheked task" : "task"}>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={isChecked}
          disabled={!isTaskInputComplete}
          onChange={(e) => checkboxInput(id, e.target.checked)}
        />
        {isChecked && task.length > 2 ? (
          <img
            className="checkbox-icon"
            src="checked.svg"
            alt="Checkbox Icon"
          />
        ) : (
          <img
            className={
              isTaskInputComplete && task.length > 2
                ? "checkbox-icon"
                : "checkbox-icon disabled"
            }
            src="unchecked.svg"
            alt="Checkbox Icon"
          />
        )}
      </label>

      {isTaskInputComplete ? (
        <p className={isChecked ? "taskComplete" : ""}>{task}</p>
      ) : (
        <input
          type="text"
          name=""
          id=""
          placeholder="write your task"
          value={task}
          onChange={(e) => taskInput(id, e.target.value)}
          onKeyDown={(e) =>
            task.length > 2 && e.key === "Enter" && validateInput(id)
          }
          onBlur={() => task.length > 2 && validateInput(id)}
        />
      )}

      <div className="btn-group">
        {isTaskInputComplete ? (
          <button className="btn-task" onClick={() => validateInput(id)}>
            <img src="edit.svg" alt="edit task" />
          </button>
        ) : (
          <button
            className={task.length < 3 ? "btn-task disabled" : "btn-task"}
            disabled={task.length < 3}
            onClick={() => validateInput(id)}
          >
            <img src="confirm.svg" alt="confirm task" />
          </button>
        )}

        <button
          className={
            !taskListLenght && !isTaskInputComplete
              ? "btn-task disabled"
              : "btn-task "
          }
          disabled={!taskListLenght && !isTaskInputComplete}
          onClick={() => removeOneTask(id)}
        >
          <img src="remove.svg" alt="remove task" />
        </button>
      </div>

      {isChecked && (
        <figure
          style={{
            width: "31px",
            height: "31px",
            display: "flex",
            placeItems: "center",
            position: "absolute",
            top: -15,
            right: -15,
          }}
        >
          <img src="complete.svg" width={"12px"} alt="edit task" />
        </figure>
      )}
    </div>
  );
};

export default Tasck;
