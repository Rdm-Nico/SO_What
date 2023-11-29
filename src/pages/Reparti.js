import React from 'react'
import { useNavigate } from 'react-router-dom';





export const Reparti = () => {
  let navigate = useNavigate();

  return (
    <div className='reparti'>
      <h1>Reparti</h1>
      <button onClick={() => {navigate('/')}} >Home</button>
    </div>
  )
}
export const Tornitura = () => {
  let navigate = useNavigate();
  return (
    <div className='reparti'>
      <h1>Reparto di Tornitura</h1>
      <button onClick={() => {navigate('/')}} >Home</button>
    </div>
  )
}
export const Dentatura = () => {
  return (
    <div className='reparti'>
      <h1>Reparto di Dentatura</h1>
    </div>
  )
}
export const Rettifica = () => {
  return (
    <div className='home'>
      <h1>Reparto di Rettifica</h1>
    </div>
  )
}
export const Qualità = () => {
  return (
    <div className='reparti'>
      <h1>Qualità</h1>
    </div>
  )
}

export default Reparti;


