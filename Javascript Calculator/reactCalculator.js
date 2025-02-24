const calcData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

const operators = ["AC", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">{input}</span>
  </div>
);

const Key = ({ keyData: { id, value }, handleInput }) => (
   <button id={id} onClick={() => handleInput(value)}>
     {value}
   </button>
);

const KeyBoard = ({ handleInput }) => (
  <div className="keys">
    {calcData.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

const App = () => {
  const [input, setInput] = React.useState("0")
  const [output, setOutput] = React.useState("")
  const [calculatorData, setCalculatorData] = React.useState("")
  
  const handleSubmit = () => {
    console.log("handleSubmit")
}
  
  const handleClear = () => {}
  
  const handleNumbers = () => {}
  
  const dotOperator = () => {}
  
  const handleOperators= () => {}
  
  const handleInput= (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);
    
    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator();
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
}
  
  const handleOutput= () => {
    setOutput(calculatorData)
  }
  
  React.useEffect(() => {
    handleOutput()
  }, [calculatorData])
  
  return (
   <div className="container">
    <div className="calculator">
     <Display input={input} output={output} />
     <KeyBoard handleInput={handleInput} />
    </div>
   </div>   
  )
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />); 