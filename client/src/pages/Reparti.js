import React from 'react'
import { useNavigate } from 'react-router-dom';
import IstruzioniListsReparto from "../components/istruzioni-list-reparto.api";





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
export const Raddrizzatura = () => {
    return (
        <div className='reparti'>
            <h1>Raddrizzatura</h1>
            <IstruzioniListsReparto name="raddrizzatura"/>
        </div>
    )
}
export const Lucidatura = () => {
    return (
        <div className='reparti'>
            <h1>Lucidatura</h1>
            <IstruzioniListsReparto name="lucidatura"/>
        </div>
    )
}
export const Ufficio_Tecnico = () => {
    return (
        <div className='reparti'>
            <h1>Ufficio Tecnico</h1>
            <IstruzioniListsReparto name="ufficio tecnico"/>
        </div>
    )
}
export const Logistica = () => {
    return (
        <div className='reparti'>
            <h1>Logistica</h1>
            <IstruzioniListsReparto name="logistica"/>
        </div>
    )
}
export const Produzione = () => {
    return (
        <div className='reparti'>
            <h1>Produzione</h1>
            <IstruzioniListsReparto name="produzione"/>
        </div>
    )
}
export const Amministrazione = () => {
    return (
        <div className='reparti'>
            <h1>Amministrazione</h1>
            <IstruzioniListsReparto name="amministrazione"/>
        </div>
    )
}

export default Reparti;


