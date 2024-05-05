import Tasck from "./task";
import { TodoContextConsumer } from "./store/store";
import Confirm from "./confirm";

const TodoHome = () => {
  const {
    taskListState,
    dispatch,
    isAllChecked,
    isRemoveAllConfirm,
    setIsRemoveAllConfirm,
  } = TodoContextConsumer();

  if (isRemoveAllConfirm) {
    return <Confirm />;
  } else {
    return (
      <div className="top-parent-container">
        <div className="title">
          <h1>My TODO List</h1>
        </div>
        <div className="task-list-container">
          {taskListState.map((elm: any) => (
            <Tasck key={elm.id} {...elm} />
          ))}
        </div>

        <div className="title todo-footer">
          <button
            className={
              taskListState.length > 0 &&
              !taskListState[taskListState.length - 1].isTaskInputComplete
                ? "btn-new-task disabled"
                : "btn-new-task"
            }
            onClick={() => dispatch({ type: "ADD_NEW_TASK" })}
            disabled={
              taskListState.length > 0 &&
              !taskListState[taskListState.length - 1].isTaskInputComplete
            }
          >
            <img src="v-icon.svg" alt="new task" />
          </button>
          {!isAllChecked ? (
            <button
              className={
                !taskListState[taskListState.length - 1].isTaskInputComplete
                  ? "btn-task-allComplete disabled"
                  : "btn-task-allComplete"
              }
              disabled={
                !taskListState[taskListState.length - 1].isTaskInputComplete
              }
              onClick={() => dispatch({ type: "SELECT_ALL_TASK" })}
            >
              All Completed
            </button>
          ) : (
            <button
              className="btn-task-allRemove"
              onClick={() => setIsRemoveAllConfirm(true)}
            >
              Remove All
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default TodoHome;
