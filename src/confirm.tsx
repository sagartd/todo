import { TodoContextConsumer } from "./store/store";

const Confirm = () => {
  const { dispatch, setIsRemoveAllConfirm } = TodoContextConsumer();
  return (
    <div className="confirm-container">
      <div className="confirm-main">
        <h3>Are you sure want to remove all the task?</h3>
        <div>
          <button
            className="btn-task-allComplete"
            onClick={() => {
              dispatch({ type: "REMOVE_ALL_TASK" }), setIsRemoveAllConfirm(false);
            }}
          >
            Yes
          </button>
          <button
            className="btn-task-allRemove"
            onClick={() => setIsRemoveAllConfirm(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;

