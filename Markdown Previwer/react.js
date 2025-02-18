class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        markdown: ''
      }
     this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
      this.setState({ markdown: event.target.value });
    }
    
    render() {
      return (
        <div className="row">
          <div className="col-md-6">
            <h1>Markdown</h1>
            <textarea onChange={() => this.handleChange(event)} value={this.state.markdown} rows="10" style={{width: "300px"}}/>
          </div>
          <div className="col-md-6">
            <h1>Preview</h1>
            <div>
              <h3> {(this.state.markdown)} </h3>
            </div>
          </div>
        </div>
      );
    }
  }
  
  ReactDOM.render(<App />, document.querySelector('.render-target'));