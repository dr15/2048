import './App.css';
import Board from "./components/Board";

function App() {
  return (
    <div className="App">
      <header>
        <h1>2048</h1>
        <div className="dashboard">
          <div>
            <div>score</div>
            <div>1234</div>
          </div>
          <button>new game</button>
        </div>
      </header>
      <Board/>
    </div>
  );
}

export default App;
