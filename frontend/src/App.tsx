import { useState, useEffect } from "react";

const BASE_URL = "https://localhost:7282/api/todos";

interface Todo {
  id: string;
  text: string;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  // Fetch todos from the backend (you can provide a mock API endpoint)
  useEffect(() => {
    // Implement API call to fetch todos from the .NET Core backend here
  }, []);

  const addTodo = () => {
    // Implement the logic to add a new to-do item here
  };

  const deleteTodo = (id: string) => {
    // Implement the logic to delete a to-do item here
  };

  // Render the list of todos and the input field for adding new todos

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
