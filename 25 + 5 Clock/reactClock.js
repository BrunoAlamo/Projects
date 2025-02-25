const App = () => {
    const { handleBreakIncrease, handleBreakDecrease, play, handleSessionIncrease, handleSessionDecrease, title, handlePlay, handleReset, breakLength, sessionLength, timeFormatter = () => "25:00" } = {}
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
                <button disabled={play} onClick={handleSessionDecrease} id="session-increment">Down</button>
              </div>
            </div>
          </div>
          <div className="time-wrapper">
            <div className="timer">
              <h2 id="timer-label">{title}</h2>
              <h3 id="timer-left">{timeFormatter()}</h3>
            </div>
            <button onClick={handlePlay} id="start_stop">Start/Stop</button>
            <button onClick={handleReset} id="reset">Reset</button>
          </div>
        </div>
        <audio />
      </div>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById("app"));