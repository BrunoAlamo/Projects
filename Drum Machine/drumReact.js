const data = [
    { id: 'snare', letter: 'Q', src: 'https://www.myinstants.com/media/sounds/snare.mp3' },
    { id: 'bass 1', letter: 'W', src: 'https://www.myinstants.com/media/sounds/bass-drum.mp3' },
    { id: 'Heater 3', letter: 'E', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3' },
    { id: 'tom tom', letter: 'A', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3' },
    { id: 'clap', letter: 'S', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3' },
    { id: 'Open-HH', letter: 'D', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3' },
    { id: 'Kick-n-Hat', letter: 'Z', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3' },
    { id: 'Kick', letter: 'X', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3' },
    { id: 'Closed-HH', letter: 'C', src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'  },
  ]
  
  class DrumPad extends React.Component {
    
    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyDown)
      window.focus()
    }
    
    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeydown)
    }
    
    handleKeyDown = e => {
      if(e.keyCode === this.props.letter.charCodeAt()){
        this.audio.play()
        this.audio.currentTime = 0
        this.props.handleDisplay(this.props.id)
      }
    }
    
    handleClick = () => {
      this.audio.play()
      this.audio.currentTime = 0
      this.props.handleDisplay(this.props.id)
    }
    
    render() {
      return (
        <div 
          className="drum-pad" 
          id={this.props.id}
          onClick={this.handleClick}
          >
          <h1>{this.props.letter}</h1>
          <audio 
            ref={ref => this.audio = ref}
            className='clip'
            src={this.props.src} 
            id={this.props.letter}> 
            </audio>
        </div>
      )
    }
  }
  
  class App extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        display: 'Click or Press Key'
      }
    }
    
   handleDisplay = (id) => this.setState({ display: id });
    
    render(){
      return (
        <div id="drum-machine">
          <div id="display">{this.state.display}</div>
           <div id='drum-pads'>
          {data.map(d => (
            <DrumPad 
              id={d.id}
              letter={d.letter}
              src={d.src}
              handleDisplay={this.handleDisplay}
             />
          ))}
           </div>
        </div>
      );
    }
  } 
  
  ReactDOM.render(<App />, document.getElementById("root"));