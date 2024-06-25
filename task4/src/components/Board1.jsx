// Board1.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Square from './Square';
import Line from './Line';
import { useRef } from 'react';
import gameEngineService from '../Services/GameEngineService.js'

function Board1() {
    const dispatch = useDispatch();
    const boardState = useSelector(state => state.board);
    const isXPlaying = useSelector(state => state.isXPlaying);
    const messagesFromStorage = useSelector(state => state.messages);
    const currentWinner = useSelector(state => state.currentWinner);

    const [squares, setSquares] = useState(boardState);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [info, setInfo] = useState('Your turn');
    const [winnerCombination, setWinnerCombination] = useState(null);
    const [isGameStarted, setIsGameStarted] = useState(false);

    const containerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });


    useEffect(() => {
        if (!isGameStarted) {
            setIsGameStarted(true);
            setInfo('Game started, your turn');
        } else if (currentWinner) {
            setInfo(currentWinner === 'x' ? 'You win' : 'You lost');
            setTimeout(() => dispatch({ type: "UPDATE_CURRENT_WINNER", payload: null }), 5000);
            const winnerInfo = gameEngineService.checkWinner(boardState);
            setWinnerCombination(winnerInfo.combination);
        } else if (squares.every((square) => square !== null)) {
            setInfo(`Draw!`);
        } else {
            setInfo(isXPlaying ? 'Your turn' : 'Wait your opponent');
        }
        setSquares(boardState);
        setMessages(messagesFromStorage);
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        updateDimensions();

        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);

    }, [boardState, currentWinner, isXPlaying, squares, messagesFromStorage, dispatch]);

    const addMessage = (message) => {
        dispatch({ type: "ADD_MESSAGE", payload: { player: 'x', message: message } });
        setNewMessage('');
    };

    return (
        <div className="fields">
            <h1 className="headerInfo" style={{
                color: info === 'You win' ? "#00AE1C" : info === 'You lost' ? "#FF5620" : "#EF9919"
            }}>{info}</h1>
            <div className='player-container' >
                <div className="player1" ref={containerRef}>
                    {winnerCombination && <Line size={dimensions.width} color="white" strokeWidth={8} combination={winnerCombination} />}
                    {boardState.map((square, index) => (
                        <span key={index}>
                            <Square
                                isDisabled={info.includes('You win') || info.includes('You lost')}
                                value={square}
                                setSquareValue={() => gameEngineService.setSquareValue(setInfo, dispatch, index, 'x', boardState, isXPlaying)}
                                isWinnerSquare={winnerCombination && winnerCombination.includes(index)}
                            />
                            {(index === 2 || index === 5) && <br />}
                        </span>
                    ))}
                </div>
            </div>
            <div className="chat">
                <div className="chat-player">
                    <h2 className="player-badge">X</h2>
                    <h2 className="player-header">Player 1</h2>
                </div>
                <div className="messages">
                    {messages.map((message, index) => (
                        <div style={{
                            backgroundColor: message.player === 'x' ? '#00AE1C' : '#737373',
                            color: '#fff',
                            width: 'fit-content',
                            padding: '4px 12px 4px 12px',
                            margin: '10px',
                            display: 'flex',
                            alignSelf: message.player === 'x' ? 'self-end' : 'self-start',
                            borderRadius: '12px',
                            maxWidth: '250px'
                        }}
                            key={index}>{message.message}</div>
                    ))}
                </div>
                <div className="input-ms">
                    <input className="ms-text" type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Message" />
                    <button className="btn-ms" onClick={() => addMessage(newMessage)}><img src=".\src\components\Send Icon.png" alt="Send"></img></button>
                </div>
            </div>
        </div>
    );
}

export default Board1;
