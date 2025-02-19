class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: `# Header 1
## Subheader 2

[Google](https://www.google.com)

Inline \`code\`

\`\`\`
const x = 10;
\`\`\`

- List item 1
- List item 2

> This is a blockquote.

![React Logo](https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg)

**Bold Text**`
    };

    this.handleChange = this.handleChange.bind(this);

    // Optional: Set any marked options here (this one enables line breaks)
    marked.setOptions({
      breaks: true,
    });
  }

  handleChange(event) {
    this.setState({ markdown: event.target.value }); // Update state as user types
  }

  render() {
    const { markdown } = this.state;

    return (
      <div className="row">
        <div className="col-md-6">
          <h1>Markdown</h1>
          <textarea
            id="editor"
            onChange={this.handleChange} // Update state as user types
            value={markdown}  // Bind textarea value to state
            rows="10"
            style={{ width: "300px" }}
          />
        </div>
        <div className="col-md-6">
          <h1>Preview</h1>
          <div id="preview">
            {/* Only render the parsed HTML if markdown is not empty */}
            {markdown.trim() && (
              <div
                dangerouslySetInnerHTML={{
                  __html: marked.parse(markdown), // Parse markdown to HTML
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.render-target'));




