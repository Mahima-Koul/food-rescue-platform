import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      {showSignup ? <Signup /> : <Login />}
      
      <button onClick={() => setShowSignup(!showSignup)}>
        {showSignup ? "Go to Login" : "Go to Signup"}
      </button>
    </>
  );
}

export default App;