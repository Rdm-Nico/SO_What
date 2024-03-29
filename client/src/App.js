
import './App.css';
import Sidebar from './components/SideBar/Sidebar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Reparti, Dentatura, Tornitura, Rettifica, Qualità } from './pages/Reparti';
import Istruzione from "./components/istruzioni.component";
import AddIstruzione from "./components/add-istruzione.component";
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
        <Route path="/reparti" exact Component={Reparti} />
        <Route path="/reparti/dentatura" exact Component={Dentatura} />
        <Route path="/reparti/tornitura" exact Component={Tornitura} />
        <Route path="/reparti/qualità" exact Component={Qualità} />
        <Route path="/reparti/rettifica" exact Component={Rettifica} />
        <Route path="/istruzione/:id" element={<Istruzione />} />
        <Route path="/istruzione/upload" element={<AddIstruzione />} />
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
