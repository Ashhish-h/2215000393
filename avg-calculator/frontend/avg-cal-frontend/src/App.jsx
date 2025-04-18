import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AvgDisplay from "./components/AvgDisplay";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <AvgDisplay />
      </div>
    </>
  );
}

export default App;

