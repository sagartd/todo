import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  ReactNode,
} from "react";

export interface Task {
  id: number;
  isChecked: boolean;
  task: string;
  isTaskInputComplete: boolean;
}

interface TodoState {
  taskListState: Task[];
  isAllChecked: boolean;
  isRemoveAllConfirm: boolean;
  taskListLength: boolean;
}

export type TodoAction =
  | { type: "ADD_NEW_TASK" }
  | { type: "SELECT_ALL_TASK" }
  | { type: "REMOVE_ALL_TASK" }
  | { type: "TASK_INPUT"; id: number; value: string }
  | { type: "VALIDATE_TASK"; payload: number }
  | { type: "SINGLE_CHECKED"; payload: number }
  | { type: "SINGLE_REMOVED"; payload: number };

const emptyTask: Task = {
  id: Math.floor(Math.random() * 10000),
  isChecked: false,
  task: "",
  isTaskInputComplete: false,
};

const initialState = (): Task[] => {
  const storedState = localStorage.getItem("todoState");
  return storedState ? JSON.parse(storedState) : [emptyTask];
};

const reducer = (currentState: Task[], action: TodoAction): Task[] => {
  switch (action.type) {
    case "ADD_NEW_TASK":
      const newID: number = Math.floor(Math.random() * 10000);
      return [...currentState, { ...emptyTask, id: newID }];
    case "SELECT_ALL_TASK":
      return currentState.map((elm) => ({ ...elm, isChecked: true }));
    case "REMOVE_ALL_TASK":
      return [{ ...emptyTask }];
    case "TASK_INPUT":
      return currentState.map((e) =>
        e.id === action.id ? { ...e, task: action.value } : e
      );
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
        e.id === action.payload ? { ...e, isChecked: !e.isChecked } : { ...e }
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

export interface TodoContextType extends TodoState {
  dispatch: React.Dispatch<TodoAction>;
  setIsRemoveAllConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoContext = createContext<TodoContextType | null>(null);

interface TodoStoreProps {
  children: ReactNode;
}

const Store = ({ children }: TodoStoreProps) => {
  const [state, dispatch] = useReducer(reducer, initialState());
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isRemoveAllConfirm, setIsRemoveAllConfirm] = useState<boolean>(false);

  const taskListLength = state.length > 1;

  useEffect(() => {
    const checkChecking = state.some((e:Task) => !e.isChecked);
    setIsAllChecked(!checkChecking);
    localStorage.setItem("todoState", JSON.stringify(state));
  }, [state]);

  const value: TodoContextType = {
    taskListState: state,
    isAllChecked,
    isRemoveAllConfirm,
    taskListLength,
    dispatch,
    setIsRemoveAllConfirm,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default Store;

export const useTodoContextConsumer = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
