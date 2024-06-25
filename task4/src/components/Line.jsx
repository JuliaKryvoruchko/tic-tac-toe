// src/components/Line.js
import React from 'react';

const Line = ({ size, color, strokeWidth, combination }) => {

    let x1 = 0;
    let y1 = 0
    let x2 = 0;
    let y2 = 0;

    const calculateCoordinated = () => {
        switch (combination) {
            case 'diag-l-r':
                x1 = 0;
                y1 = 0;
                x2 = size;
                y2 = size;
                break;
            case 'diag-r-l':
                x1 = size;
                y1 = 0;
                x2 = 0;
                y2 = size;
                break;
            case 'row-1':
                x1 = 0;
                y1 = Math.round(size / 6);
                x2 = size;
                y2 = Math.round(size / 6);
                break;
            case 'row-2':
                x1 = 0;
                y1 = Math.round(size / 2);
                x2 = size;
                y2 = Math.round(size / 2);
                break;
            case 'row-3':
                x1 = 0;
                y1 = Math.round(size / 1.2);
                x2 = size;
                y2 = Math.round(size / 1.2);
                break;
            case 'col-1':
                x1 = Math.round(size / 6);;
                y1 = 0;
                x2 = Math.round(size / 6);
                y2 = size;
                break;
            case 'col-2':
                x1 = Math.round(size / 2);;
                y1 = 0;
                x2 = Math.round(size / 2);
                y2 = size;
                break;
            case 'col-3':
                x1 = Math.round(size / 1.2);;
                y1 = 0;
                x2 = Math.round(size / 1.2);
                y2 = size;
                break;
        }
    }

    calculateCoordinated();

    return (
        <svg width={size} height={size} style={{ 'position': 'absolute', 'zIndex': 1 }}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={strokeWidth} />
        </svg>
    );
};

export default Line;
