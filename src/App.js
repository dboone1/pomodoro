
import './App.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import React, { useState, useEffect, useRef } from 'react';
import { faSpaghettiMonsterFlying } from '@fortawesome/free-solid-svg-icons';

  

function App() {
  
  const [breakTime, setBreakTime] = React.useState(5);

  const[sessionTime, setSessionTime] = React.useState(25);

  const[minutes, setMinutes] = React.useState(25);

  const[seconds, setSeconds] = React.useState(0);

  const[isBreakActive, setBreakActive] = React.useState(false);

  const[timer, setTime] = React.useState(null);

  const[timerStatus, setTimerStatus] = React.useState("Status : Paused")

 

  const audioSound = useRef();

  const beep = () => {
    if(audioSound.current !== null){
      audioSound.current.play();
    }
  }

  const pauseSound = () => {
    if(audioSound.current !== null){
      audioSound.current.pause();
    }
  }

  useEffect( () =>{
    if(timer){
      let interval = setInterval(() => {
        
        numberChange();
       
      }, 1000)
      return () => {clearInterval(interval);}
    }
  })

  function numberChange(){
    if(seconds === 0){
      if(minutes === 0){
        beep();
        ModeSwap();
      }
      else{
        setSeconds(59);
        setMinutes(prev => prev - 1);
      }

    }
    else{
      setSeconds(prev => prev - 1);
    }
  }

  function ModeSwap(){
    
    setBreakActive(!isBreakActive);

    if (isBreakActive === false){
      
      setMinutes(breakTime);
      setSeconds(0);
      setTimerStatus("Session Start!");
    }
    else{
      setBreakActive(false);
      setMinutes(sessionTime);
      setSeconds(0);
      setTimerStatus("Break Time!");
    }
  }

  function subBreak(){
    if(!timer){
      if(breakTime !== 1){
        setBreakTime (prev => prev - 1);
      }
    }
  }

  function addBreak(){
    if(!timer){
      if(breakTime < 60){
        setBreakTime(prev => prev + 1);
        
      }
    }
  }

  function addSession(){
    if(!timer){
      if(sessionTime < 60){
        setSessionTime(prev => prev + 1);
        setMinutes(sessionTime + 1);
      }
    }
  }

  function subSession(){
    if(!timer){
      if(sessionTime !== 1){
        setSessionTime(prev => prev -1);
        setMinutes(sessionTime - 1);
      }
    }
  }

  function reset(){
    setSessionTime(25);
    setMinutes(25);
    setBreakTime(5);
    setSeconds(0);
    setBreakActive(false);
    timePause();
    pauseSound();
    
    setTimerStatus("Status : Paused")
  }

  function timePause(){
    setTime(null);
    setTimerStatus("Status : Paused");
  }

  function startTimer(){
    setTime(true);
    setTimerStatus("Session Start!");
  }

  const displayTime = () => {
    let minuteText = minutes < 10 ? '0' + minutes
    : minutes;

    let secondText = seconds < 10 ? '0' + seconds
    : seconds;

    return minuteText + ":" + secondText;
  }

  const time = displayTime();


  let totalSeconds = sessionTime * 60;
  let currentSeconds = minutes * 60 + seconds;

  
  let percent = Math.floor(currentSeconds / totalSeconds * 100);
  
  return (
    <div className="main-wrapper">
      <div id="title">Pomodoro Clock</div>
      <div id="time-left">
        <CircularProgressbar 
        value= {percent}
        text={time}
        ></CircularProgressbar>
      </div>
      <div id="start_stop">
        <button onClick={startTimer}  id="start"> <i className="fa-solid fa-circle-play"></i></button>
        <button onClick={timePause} id="pause"> <i className="fa-solid fa-circle-pause"></i></button>
        <button onClick={reset} id="reset"><i className="fa-solid fa-rotate"></i></button>
      </div>
      <div id="timer-label">{timerStatus}</div>
      <div className="controls">
        <div className="session-controls">
          <div id="session-label">Session Length</div>
          <div onClick={addSession} id="session-increment"><i class="fa-solid fa-square-plus"></i></div>
          <div id="session-length">{sessionTime}</div>
          <div onClick={subSession} id="session-decrement"><i class="fa-solid fa-square-minus"></i></div>
          
        </div>
        <div className="break-controls">
          <div id="break-label">Break Length</div>
          <div onClick={subBreak} id="break-decrement"><i class="fa-solid fa-square-minus"></i></div>
          <div id="break-length">{breakTime}</div>
          <div onClick={addBreak} id="break-increment"><i class="fa-solid fa-square-plus"></i></div>
        </div>

        
      </div>
     
      <audio id="beep" ref={audioSound} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      type='audio'
      />
      
  </div>  
  
  );
}
export default App;

