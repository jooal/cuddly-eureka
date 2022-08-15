import "./App.css";
import * as React from "react";
import { Home } from "./routes/Home";
import { AuthProvider } from "./AuthProvider";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <header className="App-header">
          <Home />
        </header>
      </div>
    </AuthProvider>
  );
}

export default App;
