import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Link
          className="App-link"
          to="/signin"
        >
          Learn React
        </Link>
      </header>
    </div>
  );
}

export default App;
