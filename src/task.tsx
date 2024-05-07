import { TodoContextType, useTodoContextConsumer } from "./store/store";

interface TaskProp {
  id: number;
  task: string;
  isChecked: boolean;
  isTaskInputComplete: boolean;
}

const Tasck: React.FC<TaskProp> = ({
  id,
  task,
  isChecked,
  isTaskInputComplete,
}) => {
  const { dispatch, taskListLength }: TodoContextType =
    useTodoContextConsumer();

  return (
    <div className={isChecked && task.length > 1 ? "whenCheked task" : "task"}>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={isChecked}
          disabled={!isTaskInputComplete}
          readOnly
          onChange={() => dispatch({ type: "SINGLE_CHECKED", payload: id })}
        />
        {isChecked && task.length > 1 ? (
          <img
            className="checkbox-icon"
            src="checked.svg"
            alt="Checkbox Icon"
          />
        ) : (
          <img
            className={
              isTaskInputComplete && task.length > 1
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
          onChange={(e) => {
            e.preventDefault,
              dispatch({
                type: "TASK_INPUT",
                id: id,
                value: e.target.value,
              });
          }}
          onKeyDown={(e) =>
            task.length > 1 &&
            e.key === "Enter" &&
            dispatch({ type: "VALIDATE_TASK", payload: id })
          }
          onBlur={() =>
            task.length > 1 && dispatch({ type: "VALIDATE_TASK", payload: id })
          }
        />
      )}

      <div className="btn-group">
        {isTaskInputComplete ? (
          <button
            className="btn-task"
            onClick={() => dispatch({ type: "VALIDATE_TASK", payload: id })}
          >
            <img src="edit.svg" alt="edit task" />
          </button>
        ) : (
          <button
            className={task.length < 2 ? "btn-task disabled" : "btn-task"}
            disabled={task.length < 2}
            onClick={() => dispatch({ type: "VALIDATE_TASK", payload: id })}
          >
            <img src="confirm.svg" alt="confirm task" />
          </button>
        )}

        <button
          className={
            !taskListLength && !isTaskInputComplete
              ? "btn-task disabled"
              : "btn-task "
          }
          disabled={!taskListLength && !isTaskInputComplete}
          onClick={() => dispatch({ type: "SINGLE_REMOVED", payload: id })}
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
