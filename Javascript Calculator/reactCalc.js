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
    const [input, setInput] = React.useState("0");
    const [output, setOutput] = React.useState("");
    const [calculatorData, setCalculatorData] = React.useState("");
    const [evaluated, setEvaluated] = React.useState(false);
  
    const handleSubmit = () => {
      try {
        let sanitizedExpression = calculatorData.replace(/x/g, "*");
        let result = eval(sanitizedExpression);
        setInput(`${result}`);
        setOutput(`${result}`);
        setCalculatorData(`${result}`);
        setEvaluated(true);
      } catch (error) {
        setInput("Error");
        setOutput("Error");
        setCalculatorData("0");
      }
    };
  
    const handleClear = () => {
      setInput("0");
      setOutput("");
      setCalculatorData("0");
      setEvaluated(false);
    };
  
    const handleNumbers = (value) => {
      if (evaluated) {
        setCalculatorData(`${value}`);
        setInput(`${value}`);
        setEvaluated(false);
      } else {
        setCalculatorData(calculatorData === "0" ? `${value}` : `${calculatorData}${value}`);
        setInput(input === "0" ? `${value}` : `${input}${value}`);
      }
    };
  
    const dotOperator = () => {
      const lastSegment = calculatorData.split(/[-+x\/]/).pop();
      if (!lastSegment.includes(".")) {
        setCalculatorData(`${calculatorData}.`);
        setInput(`${input}.`);
      }
    };
  
    const handleOperators = (value) => {
      if (evaluated) {
        setEvaluated(false);
      }
      const validOp = value === "x" ? "*" : value;
      setCalculatorData((prev) => {
      // If the last two characters are an operator followed by '-', and a new operator is entered, replace both
      if (/[*/+-]-$/.test(prev) && value !== "-") {
        return prev.slice(0, -2) + validOp;
      }
  
      // Allow '-' after an operator for negative numbers
      if (/[*/+]$/.test(prev) && value === "-") {
        return prev + value;
      }
  
      // Replace multiple consecutive operators with the last entered operator
      return prev.replace(/[*/+]+$/, "") + validOp;
    });
  
    setInput(value);
  };
  
    const handleInput = (value) => {
      if (!isNaN(value)) {
        handleNumbers(value);
      } else if (value === "AC") {
        handleClear();
      } else if (value === "=") {
        handleSubmit();
      } else if (value === ".") {
        dotOperator();
      } else {
        handleOperators(value);
      }
    };
  
    React.useEffect(() => {
      setOutput(calculatorData);
    }, [calculatorData]);
  
    return (
      <div className="container">
        <div className="calculator">
          <Display input={input} output={output} />
          <KeyBoard handleInput={handleInput} />
        </div>
      </div>
    );
  };
  
  ReactDOM.createRoot(document.getElementById("app")).render(<App />);