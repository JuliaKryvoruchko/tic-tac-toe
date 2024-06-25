import Board1 from "./components/Board1";
import Board2 from "./components/Board2";
import Scores from "./components/Score";

function App() {
  function resetGame() {
    window.location.reload(false)
  }
  return (
    <div className="App">
      <div className="score">
        <p className="player-header">Player 1</p>
        <div className="scoreReset">
          <Scores></Scores>
          <button className="btn-reset" onClick={resetGame}>Reset</button>
        </div>
        <p className="player-header">Player 2</p>
      </div>
      <div className="boards">
        <Board1 />
        <p className="verticalLine">_________________________________________________________________________</p>
        <Board2 />
      </div>
    </div>
  );
}

export default App;
