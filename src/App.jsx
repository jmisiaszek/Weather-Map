import React, { useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux';
import MapComponent from './features/Map/Map';

function App() {
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <MapComponent />
      </div>
    </>
  )
}

export default App
