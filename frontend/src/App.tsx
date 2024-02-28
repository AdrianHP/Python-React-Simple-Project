import { useState, useEffect } from "react";

import { getUsers } from "./toDoList/services/apiService";
import { User } from "./toDoList/interfaces/users";
import ToDoList from "./toDoList/components/to-do-list/to-do-list";

const App = () => {

  return (
    <div>
      <ToDoList></ToDoList>
    </div>
  );
};

export default App;
