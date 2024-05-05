import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const TodoContext = createContext();
export interface Task {
  id: number;
  isChecked: boolean;
  task: string;
  isTaskInputComplete: boolean;
}

const emptyTask: Task = {
  id: Math.floor(Math.random() * 10000),
  isChecked: false,
  task: "",
  isTaskInputComplete: false,
};

const reduce = (currentState, action) => {
  switch (action.type) {
    case "ADD_NEW_TASK":
      const newID: number = Math.floor(Math.random() * 10000);
      return [...currentState, { ...emptyTask, id: newID }];
    case "SELECT_ALL_TASK":
      return currentState.map((elm) => ({ ...elm, isChecked: true }));
    case "REMOVE_ALL_TASK":
      return [{ ...emptyTask }];
    case "TASK_INPUT":
      return currentState.map((e) => {
        return e.id === action.id
          ? {
              ...e,
              task: action.value,
            }
          : e;
      });
    case "VALIDATE_TASK":
      return currentState.map((e) =>
        e.id === action.payload
          ? {
              ...e,
              isTaskInputComplete: !e.isTaskInputComplete,
              isChecked: false,
            }
          : { ...e }
      );

    case "SINGLE_CHECKED":
      return currentState.map((e) =>
        e.id === action.payload
          ? {
              ...e,
              isChecked: !e.isChecked,
            }
          : { ...e }
      );

    case "SINGLE_REMOVED":
      if (currentState.length > 1) {
        return currentState.filter((e) => e.id !== action.payload);
      } else {
        return [{ ...emptyTask }];
      }

    default:
      return currentState;
  }
};

const Store = ({ children }: any) => {
  const [taskListState, dispatch] = useReducer(reduce, [emptyTask]);
  const [isAllChecked, setIsAllCheked] = useState(false);
  const [isRemoveAllConfirm, setIsRemoveAllConfirm] = useState(false);

  const taskListLenght = taskListState.length > 1;

  useEffect(() => {
    const checkChecking = taskListState.some((e) => e.isChecked === false);
    setIsAllCheked(!checkChecking);
  }, [taskListState]);

  return (
    <TodoContext.Provider
      value={{
        taskListState,
        dispatch,
        isAllChecked,
        setIsRemoveAllConfirm,
        isRemoveAllConfirm,
        taskListLenght,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default Store;

export const TodoContextConsumer = () => {
  return useContext(TodoContext);
};
