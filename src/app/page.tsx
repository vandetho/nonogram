'use client';

import React, { useEffect, useState } from 'react';

const numRows = 5;
const numCols = 5;

const generateRandomPuzzle = (): number[][] => {
    const puzzle: number[][] = Array.from({ length: numRows }, () =>
        Array.from({ length: numCols }, () => 0)
    );

    // Set a random number of filled cells for each row
    const rowIndicators = puzzle.map(() => Math.floor(Math.random() * (numCols + 1)));
    rowIndicators.forEach((numFilled, rowIndex) => {
        for (let i = 0; i < numFilled; i++) {
            puzzle[rowIndex][i] = 1;
        }
    });

    // Set a random number of filled cells for each column
    const colIndicators = Array.from({ length: numCols }, () => Math.floor(Math.random() * (numRows + 1)));
    colIndicators.forEach((numFilled, colIndex) => {
        for (let i = 0; i < numFilled; i++) {
            puzzle[i][colIndex] = 1;
        }
    });

    return puzzle;
};

const NonogramGame = () => {
    const [puzzle, setPuzzle] = useState<number[][]>(generateRandomPuzzle());
    const [rowIndicators, setRowIndicators] = useState<number[]>([]);
    const [colIndicators, setColIndicators] = useState<number[]>([]);

    useEffect(() => {
        // Update the row and column indicators whenever the puzzle changes
        updateIndicators();
    }, [puzzle]);

    const handleCellClick = (row: number, col: number): void => {
        const newPuzzle = puzzle.map((r, rowIndex) =>
            r.map((value, colIndex) =>
                rowIndex === row && colIndex === col ? 1 - value : value
            )
        );
        setPuzzle(newPuzzle);
    };

    const updateIndicators = (): void => {
        // Update row indicators
        const updatedRowIndicators = puzzle.map(row =>
            row.reduce((sum, cell) => sum + cell, 0)
        );
        setRowIndicators(updatedRowIndicators);

        // Update column indicators
        const updatedColIndicators = Array.from({ length: numCols }, (_, colIndex) =>
            puzzle.reduce((sum, row) => sum + row[colIndex], 0)
        );
        setColIndicators(updatedColIndicators);
    };

    return (
        <div>
            {/* Column Indicators */}
            <div style={{ display: 'flex' }}>
                {colIndicators.map((indicator, colIndex) => (
                    <div key={colIndex} className="indicator">
                        {indicator}
                    </div>
                ))}
            </div>

            {puzzle.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex' }}>
                    {/* Row Indicator */}
                    <div className="indicator">{rowIndicators[rowIndex]}</div>

                    {/* Puzzle Cells */}
                    {row.map((value, colIndex) => (
                        <div
                            key={colIndex}
                            className={`cell ${value ? 'filled' : ''}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default NonogramGame;
