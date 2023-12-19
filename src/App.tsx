import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p className="bg-red-800 text-4xl">Hello</p>
      </div>
    </>
  );
}

export default App;
