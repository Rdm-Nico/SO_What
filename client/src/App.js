
import './App.css';
import Sidebar from './components/SideBar/Sidebar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {
  Reparti,
  Dentatura,
  Tornitura,
  Rettifica,
  Qualità,
  Logistica,
  Raddrizzatura,
  Lucidatura,
  Produzione, Ufficio_Tecnico, Amministrazione
} from './pages/Reparti';
import IstruzioniListsReparto from "./components/istruzioni_list_reparto_hooks"
import Istruzione from "./components/istruzione_comp_hooks";
import AddIstruzione from "./components/add_istruzione_hooks";
import Home from './pages/Home';
import React, {Component} from "react";


class App extends Component{

  constructor(props) {
    super(props);
    this.state = {apiResponse: "" };
  }
// questa è una prova


  render(){
  return (
    <div>

    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reparti/:reparto" exact Component={IstruzioniListsReparto} />
        <Route path="/istruzione/:id" exact Component={Istruzione} />
        <Route path="/istruzione/upload" exact Component={AddIstruzione} />
        <Route path="*" element={
          <div className='home'>
            <h2> 404 Page not found</h2>
          </div>
        }/>
      </Routes>

    </BrowserRouter>
    </div>
  );
  }
}

export default App;
