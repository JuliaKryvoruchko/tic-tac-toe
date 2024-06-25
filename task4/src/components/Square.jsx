import React from 'react';

function Square({ value, setSquareValue, isDisabled, isWinnerSquare }) {
    let squareClasses = 'square';
    if (isWinnerSquare) {
        squareClasses += ' winner';
    }

    return (
        <button
            className={squareClasses}
            disabled={isDisabled}
            onClick={setSquareValue}
            style={{ color: value ? '#ef9919' : '#313131' }}
        >
            {value || '-'}
        </button>
    );
}

export default Square;
