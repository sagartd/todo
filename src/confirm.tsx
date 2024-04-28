const Confirm = ({ setIsRemoveAllConfirm, setTaskList }) => {
  return (
    <div className="confirm-container">
      <div className="confirm-main">
        <h3>Are you sure want to remove all the task?</h3>
        <div>
          <button
            className="btn-task-allComplete"
            onClick={() => {
              setTaskList([
                {
                  id: Math.floor(Math.random() * 10000),
                  isChecked: false,
                  task: "",
                  isTaskInputComplete: false,
                },
              ]),
                setIsRemoveAllConfirm(false);
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
