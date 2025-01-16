import React from "react";
import "./App.css";
const Home = React.lazy(() => import("./pages/home"));

function App() {
  return (
    <>
      <Home />
    </>
  );
}

export default App;
