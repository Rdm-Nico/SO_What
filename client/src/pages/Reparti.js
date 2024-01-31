import React from 'react'
import { useNavigate } from 'react-router-dom';
import {DentaturaApi} from "../api/dentaturaAPI";
import IstruzioniListsReparto from "../api/istruzioni-list-reparto.api";





export const Reparti = () => {
  let navigate = useNavigate();

  return (
    <div className='reparti'>
      <h1>Reparti</h1>
        <IstruzioniListsReparto name={null}/>
      <button onClick={() => {navigate('/')}} >Home</button>
    </div>
  )
}
export const Tornitura = () => {
  let navigate = useNavigate();
  return (
    <div className='reparti'>
      <h1>Reparto di Tornitura</h1>
        <IstruzioniListsReparto name="tornitura"/>
      <button onClick={() => {navigate('/')}} >Home</button>
    </div>
  )
}
export const Dentatura = () => {
  return (
    <div className='reparti'>
      <h1>Reparto di Dentatura</h1>
        <IstruzioniListsReparto name="dentatura"/>
    </div>
  )
}
export const Rettifica = () => {
  return (
    <div className='home'>
      <h1>Reparto di Rettifica</h1>
        <IstruzioniListsReparto name="rettifica"/>
    </div>
  )
}
export const Qualità = () => {
  return (
    <div className='reparti'>
      <h1>Qualità</h1>
        <IstruzioniListsReparto name="qualità"/>
    </div>
  )
}

export default Reparti;


