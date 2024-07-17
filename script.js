document.addEventListener('DOMContentLoaded', () => {
    createGrid();
});

function createGrid() {
    const grid = document.querySelector('.sudoku-grid');
    for (let i = 0; i < 16; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.min = '1';
        input.max = '4';
        grid.appendChild(input);
    }
}

function solveSudoku() {
    const cells = document.querySelectorAll('.sudoku-grid input');
    const board = Array.from(cells).map(cell => +cell.value || 0);
    const grid = [];
    for (let i = 0; i < 4; i++) grid.push(board.slice(i * 4, i * 4 + 4));

    function isValid(grid, num, row, col) {
        for (let x = 0; x < 4; x++) if (grid[row][x] === num || grid[x][col] === num) return false;
        const startRow = Math.floor(row / 2) * 2, startCol = Math.floor(col / 2) * 2;
        for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) if (grid[startRow + r][startCol + c] === num) return false;
        return true;
    }

    function solve(grid) {
        for (let row = 0; row < 4; row++) for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 4; num++) {
                    if (isValid(grid, num, row, col)) {
                        grid[row][col] = num;
                        if (solve(grid)) return true;
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
        return true;
    }

    if (solve(grid)) cells.forEach((cell, i) => cell.value = grid[Math.floor(i / 4)][i % 4]);
    else alert('No solution exists for the given Sudoku puzzle.');
}

function resetGrid() {
    const cells = document.querySelectorAll('.sudoku-grid input');
    cells.forEach(cell => cell.value = '');
}
