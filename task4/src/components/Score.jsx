import { useSelector } from 'react-redux'
import React from 'react';

function Scores() {
    const scores = useSelector(state => state.scores);
    return (
        <div className='score'>
            <h2 className='score-header'>Score:</h2>
            <div className='gameScore'>{scores.x}:{scores.o}</div>
        </div>
    );
}

export default Scores;