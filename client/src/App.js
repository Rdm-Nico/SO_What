import './App.css';
import AuthService from "./services/auth.service";
import { Routes, Route} from 'react-router-dom';
import IstruzioniListsReparto from "./components/List_items/istruzioni_list_reparto_hooks"
import Istruzione from "./components/istruzione_comp_hooks";
import AddIstruzione from "./components/add_istruzione_hooks";
import Home from './pages/Home';

import Login from "./components/auth_compontents/login";
import Register from "./components/auth_compontents/register";
import Profile from "./components/auth_compontents/profile"

import React, {useEffect, useState} from "react";
import Sidebar from "./components/SideBar/Sidebar";




const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if(user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  }

  return (
      <div>
        <Sidebar />
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/reparti/:reparto" exact Component={IstruzioniListsReparto} />
            <Route path="/istruzione/:id" exact Component={Istruzione} />
            <Route path="/istruzione/upload" exact Component={AddIstruzione} />
            <Route path="/login" exact Component={Login} />
            <Route path="/register" exact Component={Register} />
            <Route path="/profile" exact Component={Profile} />
            <Route path="*" element={
              <div className='home'>
                <h2> 404 Page not found</h2>
              </div>
            }/>
          </Routes>
        </div>
      </div>
  );
}

export default App;
