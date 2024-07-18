import React from "react";
import { MantineProvider } from "@mantine/core";
import Agri from "./components/Agri";
import "./App.css";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <div className="App">
        <h1>Manufac Assignment</h1>
        <Agri />
      </div>
    </MantineProvider>
  );
}

export default App;
