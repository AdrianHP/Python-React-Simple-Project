import { useState, useEffect } from "react";


import ToDoList from "./toDoList/components/to-do-list/ToDoList";
import LoginPage from "./pages/Loginpage";
import HomePage from "./pages/HomaPage";
import Header from "./shared/components/Header";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from "./shared/utils/PrivateRoutes";
import { AuthProvider } from "./shared/context/AuthContex";

const App = () => {

  return (
    <div>
      <Router>
        <AuthProvider>
          <Header/>
          <Routes>
            <Route path="/" element={<PrivateRoute><HomePage/></PrivateRoute>} />
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </AuthProvider>
      </Router>
      
    </div>
  );
};

export default App;
