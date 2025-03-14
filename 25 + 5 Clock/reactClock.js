const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [play, setPlay] = React.useState(false);
  const [timingType, setTimingType] = React.useState("SESSION");
  const [timeLeft, setTimeLeft] = React.useState(1500);
  
  const timeout = setTimeout(() => {
    if(timeLeft && play) {
      setTimeLeft(timeLeft - 1);
    }
  }, 1000);
  
  const handleBreakIncrease = () => {
    if(breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  }
  
  const handleBreakDecrease = () => {
    if(breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  }

  const handleSessionIncrease = () => {
    if(sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeft(timeLeft + 60);
    }
  }
  
  const handleSessionDecrease = () => {
    if(sessionLength > 1) {
      setSessionLength(sessionLength - 1);
       setTimeLeft(timeLeft - 60);
    }
  }
  
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  const handlePlay = () => {
    clearTimeout(timeout);
    setPlay(!play);
  }
  
  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "SESSION"){
      setTimeLeft(breakLength * 60);
      setTimingType("BREAK");
      audio.play();
    }
    if(!timeLeft && timingType === "BREAK"){
      setTimeLeft(sessionLength * 60);
      setTimingType("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }
  }
  
  const clock = () => {
    if(play) {
      timeout
      resetTimer()
    } else {
      clearTimeout(timeout)
    }
  }
  
  React.useEffect(() => {
    clock();
  }, [play, timeLeft, timeout])
  
  const handleReset = () => {
    clearTimeout(timeout);
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingType("SESSION");
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  }
  
  const title = timingType === "SESSION" ? "Session" : "Break"; 
  
  return (
    <div>
      <div className="wrapper">
        <h2>25 + 5 Clock</h2>
        <div className="break-session-length">
          <div>
            <h3 id="break-label">Break Length</h3>
            <div>
              <button disabled={play} onClick={handleBreakIncrease} id="break-increment">Up</button>
                <strong id="break-length">{breakLength}</strong>
              <button disabled={play} onClick={handleBreakDecrease} id="break-decrement">Down</button>
            </div>
          </div>
          <div>
            <h3 id="session-label">Session Length</h3>
            <div>
              <button disabled={play} onClick={handleSessionIncrease} id="session-increment">Up</button>
                <strong id="session-length">{sessionLength}</strong>
              <button disabled={play} onClick={handleSessionDecrease} id="session-decrement">Down</button>
            </div>
          </div>
        </div>
        <div className="time-wrapper">
          <div className="timer">
            <h2 id="timer-label">{title}</h2>
            <h3 id="time-left">{timeFormatter()}</h3>
          </div>
          <button onClick={handlePlay} id="start_stop">Start/Stop</button>
          <button onClick={handleReset} id="reset">Reset</button>
        </div>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));