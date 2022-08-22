import "./App.css";
import * as React from "react";
import { Home } from "./pages/Home";
import { AppContext, AppProvider } from "./Components/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <header className="App-header">
          <Home />
        </header>
      </div>
    </AppProvider>
  );
}

export default App;
