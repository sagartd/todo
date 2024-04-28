import { useEffect, useState } from "react";
import Tasck from "./task";
import Confirm from "./confirm";

interface Task {
  id: number;
  isChecked: Boolean;
  task: string;
  isTaskInputComplete: Boolean;
}

const emptyTask: Task = {
  id: Math.floor(Math.random() * 10000),
  isChecked: false,
  task: "",
  isTaskInputComplete: false,
};

const TodoHome = () => {
  const [taskList, setTaskList] = useState<Task[]>([emptyTask]);
  const [isAllChecked, setIsAllCheked] = useState(false);
  const [isRemoveAllConfirm, setIsRemoveAllConfirm] = useState(false);

  // console.log({ isAllChecked, taskList });

  const addNewTask = () => {
    const newID: number = Math.floor(Math.random() * 10000);
    setTaskList([...taskList, { ...emptyTask, id: newID }]);
  };

  const taskInput = (id: number, value: any) => {
    setTaskList(
      taskList.map((e) => (e.id === id ? { ...e, task: value } : { ...e }))
    );
  };

  const checkboxInput = (id: number, value: any) => {
    setTaskList(
      taskList.map((e) => (e.id === id ? { ...e, isChecked: value } : { ...e }))
    );
  };

  const allChecked = () => {
    setTaskList(
      taskList.map((e) =>
        e.isTaskInputComplete ? { ...e, isChecked: true } : { ...e }
      )
    );
  };

  const validateInput = (id: number) => {
    setTaskList(
      taskList.map((e) =>
        e.id === id
          ? {
              ...e,
              isTaskInputComplete: !e.isTaskInputComplete,
              isChecked: false,
            }
          : { ...e }
      )
    );
  };

  const removeOneTask = (id: number): any => {
    taskList.length > 1
      ? setTaskList(taskList.filter((elm) => elm.id !== id))
      : setTaskList([emptyTask]);
  };

  useEffect(() => {
    const checkChecking = taskList.some((e) => e.isChecked === false);
    setIsAllCheked(!checkChecking);
  }, [taskList]);

  if (isRemoveAllConfirm) {
    return (
      <Confirm
        setIsRemoveAllConfirm={setIsRemoveAllConfirm}
        setTaskList={setTaskList}
      />
    );
  } else {
    return (
      <div className="top-parent-container">
        <div className="title">
          <h1>My TODO List</h1>
        </div>
        <div className="task-list-container">
          {taskList.map((elm) => (
            <Tasck
              key={elm.id}
              {...elm}
              removeOneTask={removeOneTask}
              taskInput={taskInput}
              checkboxInput={checkboxInput}
              validateInput={validateInput}
              taskListLenght={taskList.length > 1}
            />
          ))}
        </div>
        <div className="title todo-footer">
          <button
            className={
              taskList.length > 0 &&
              !taskList[taskList.length - 1].isTaskInputComplete
                ? "btn-new-task disabled"
                : "btn-new-task"
            }
            onClick={() => addNewTask()}
            disabled={
              taskList.length > 0 &&
              !taskList[taskList.length - 1].isTaskInputComplete
            }
          >
            <img src="v-icon.svg" alt="new task" />
          </button>
          {!isAllChecked ? (
            <button
              className={
                !taskList[taskList.length - 1].isTaskInputComplete
                  ? "btn-task-allComplete disabled"
                  : "btn-task-allComplete"
              }
              disabled={!taskList[taskList.length - 1].isTaskInputComplete}
              onClick={() => allChecked()}
            >
              All Completed
            </button>
          ) : (
            <button
              className="btn-task-allRemove"
              onClick={() => setIsRemoveAllConfirm(true)}
              // onClick={() => setTaskList([emptyTask])}
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
