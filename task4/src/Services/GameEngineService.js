const gameEngineService = {
    checkWinner: (squares) => {
        const winnerCombinations = [
            {cells: [0, 1, 2], name: 'row-1'},
            {cells: [3, 4, 5], name: 'row-2'},
            {cells: [6, 7, 8], name: 'row-3'},
            {cells: [0, 3, 6], name: 'col-1'},
            {cells: [1, 4, 7], name: 'col-2'},
            {cells: [2, 5, 8], name: 'col-3'},
            {cells: [0, 4, 8], name: 'diag-l-r'},
            {cells: [2, 4, 6], name: 'diag-r-l'},
        ];
        for (let combination of winnerCombinations) {
            let [a, b, c] = combination.cells;
            if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
                return { winner: squares[a], combination: combination.name };
            }
        }
        return { winner: null, combination: null };
    },
    setSquareValue: (setInfo, dispatch, i, player, boardState, isXPlaying) => {
        let isPlayerO = player === 'o';
        if (boardState[i] || (!isPlayerO && !isXPlaying) || (isPlayerO && isXPlaying)) return;
        
        let newSquares = boardState.slice();
        newSquares[i] = player;
        
        dispatch({ type: "UPDATE_BOARD", payload: newSquares });
        dispatch({ type: "UPDATE_ISXPLAYING", payload: isPlayerO });
        
        let { winner, combination } = gameEngineService.checkWinner(newSquares);
        
        if (winner && player === winner) {
          setInfo(`You win`);
          dispatch({ type: "UPDATE_CURRENT_WINNER", payload: winner });
          dispatch({ type: "UPDATE_SCORE", payload: { player: winner } });
          setTimeout(() => dispatch({ type: "UPDATE_BOARD", payload: Array(9).fill(null) }), 5000);
        } else if (newSquares.every((square) => square !== null)) {
          setInfo(`Draw!`);
          setTimeout(() => dispatch({ type: "UPDATE_BOARD", payload: Array(9).fill(null) }), 5000);
        }
      }
};

export default gameEngineService;