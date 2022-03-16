"use strict";

const ruleFile = require("./no-undefined-initial-usestate");
const ESLint = require("eslint");

const ruleTester = new ESLint.RuleTester({
  parser: require.resolve("@babel/eslint-parser"),
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const errors = [
  {
    message: "Do not initialise useState with undefined",
  },
];

ruleTester.run("rule", ruleFile.rules["no-undefined-initial-usestate"], {
  valid: [
    { code: "const [test, setTest] = useState(null);" },
    { code: "const [test, setTest] = useState(true);" },
    { code: "const [test, setTest] = useState(false);" },
    { code: "const [test, setTest] = useState(123);" },
    { code: "const [test, setTest] = useState({});" },
    { code: "const [test, setTest] = useState([]);" },
    {
      code: `import { useState } from "react";

export default function App() {
  const [state, setState] = useState(0);

  return (
    <div className="App">
      <button onClick={() => setState((s) => s + 1)}>Hello Test</button>
      <h2>{state}</h2>
    </div>
  );
}`,
    },
  ],

  invalid: [
    {
      code: "const [test, setTest] = useState(undefined);",
      errors,
    },
    {
      code: "const [test, setTest] = useState();",
      errors,
    },
    {
      code: `import { useState } from "react";

    export default function App() {
      const [state, setState] = useState();

      return (
        <div className="App">
          <button onClick={() => setState((s) => s + 1)}>Hello Test</button>
          <h2>{state}</h2>
        </div>
      );
    }`,
      errors,
    },
    {
      code: `import { useState } from "react";

    export default function App() {
      const [state, setState] = useState(undefined);

      return (
        <div className="App">
          <button onClick={() => setState((s) => s + 1)}>Hello Test</button>
          <h2>{state}</h2>
        </div>
      );
    }`,
      errors,
    },
  ],
});
