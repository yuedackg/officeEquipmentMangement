import TodoList from './TodoList';
import './App.css';

function App() {
  return (
    <div>
      <TodoList />
      <input type="text" />
      <button>タスクを追加</button>
      <button></button>
      <button></button>
      <button></button>
      <div>残りのタスク：０</div>
    </div>
  );
}

export default App;
