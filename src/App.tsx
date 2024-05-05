import "./App.css";
import Store from "./store/store";
import TodoHome from "./todoHome";

function App() {
  return (
    <Store>
      <TodoHome />
    </Store>
  );
}

export default App;
