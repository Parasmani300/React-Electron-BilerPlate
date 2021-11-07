import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [hh,setHH] = useState(0);
  const [mm,setMM] = useState(0);
  const [ss,setSS] = useState(0);
  const [isActive,setIsActive] = useState(false);

  const showCheck = () => 
  {
    console.log('Helllo')
    window.ipcRenderer.send('check',{'title':'Hello'})
  }
  

  useEffect(() => {
    const interval = setInterval(() => {
      if(isActive){
        if(ss === 59){
          if(mm === 59){
            if(hh === 23){
              setHH(0);
              setMM(0);
              setSS(0);
            }else{
              setHH(hh+1);
              setMM(0);
              setSS(0);
            }
          }else{
            setMM(mm+1);
            setSS(0);
          }
        }else{
          setSS(ss+1);
        }
      }
    },10);
    return () => clearInterval(interval);
  
  }, [isActive,hh,mm,ss]);

  const handleReset = () => {
    setIsActive(false);
    setHH(0);
    setMM(0);
    setSS(0);
  }

  

  
  return (
    <div className="container-fluid">
      <div className="row mt-4">
        <div className="col-md-12">
          <center>
          <h1>{hh>=10?hh:"0"+hh}:{mm>=10?mm:"0"+mm}:{ss>=10?ss:"0"+ss}</h1>
          <button className="btn btn-primary" onClick={()=> setIsActive(true)}>Start</button>
          <button className="btn btn-danger button-margin" onClick={() => setIsActive(false)}>Stop</button>
          <button className="btn btn-warning button-margin" onClick={()=>handleReset()}>Reset</button>
          </center>
        </div>
        <button onClick={()=>showCheck()}>Show it</button>
      </div>
    </div>
  );
}

export default App;
