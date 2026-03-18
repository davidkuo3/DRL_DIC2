const GRID_SIZE = 5;
let startCell = [0, 0];
let endCell = [4, 4];
let obstacles = [[1, 1], [2, 2], [3, 3]];

const gridContainer = document.getElementById('grid');

function initGrid() {
    gridContainer.innerHTML = '';
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            
            if (r === startCell[0] && c === startCell[1]) {
                cell.classList.add('start');
                cell.innerText = 'S';
            } else if (r === endCell[0] && c === endCell[1]) {
                cell.classList.add('end');
                cell.innerText = 'E';
            } else if (obstacles.some(o => o[0] === r && o[1] === c)) {
                cell.classList.add('obstacle');
            } else {
                cell.addEventListener('click', toggleObstacle);
            }
            
            gridContainer.appendChild(cell);
        }
    }
}

function toggleObstacle(e) {
    const r = parseInt(e.target.dataset.row);
    const c = parseInt(e.target.dataset.col);
    
    const obsIndex = obstacles.findIndex(o => o[0] === r && o[1] === c);
    
    if (obsIndex > -1) {
        obstacles.splice(obsIndex, 1);
        e.target.classList.remove('obstacle');
    } else {
        obstacles.push([r, c]);
        e.target.classList.add('obstacle');
        e.target.innerHTML = '';
    }
}

async function runValueIteration() {
    // Show loading state if needed
    
    const response = await fetch('/solve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            start: startCell,
            end: endCell,
            obstacles: obstacles
        })
    });
    
    const data = await response.json();
    updateUI(data.values, data.policy);
    
    document.getElementById('results').style.display = 'block';
}

function updateUI(values, policy) {
    const cells = document.querySelectorAll('.cell');
    
    cells.forEach(cell => {
        const r = parseInt(cell.dataset.row);
        const c = parseInt(cell.dataset.col);
        
        // Clear previous content if it's not start or end
        if (!cell.classList.contains('start') && !cell.classList.contains('end') && !cell.classList.contains('obstacle')) {
            cell.innerHTML = '';
            
            const vSpan = document.createElement('span');
            vSpan.classList.add('v-value');
            vSpan.innerText = values[r][c].toFixed(1);
            
            const pSpan = document.createElement('span');
            pSpan.classList.add('policy-arrow');
            pSpan.innerText = policy[r][c];
            
            cell.appendChild(vSpan);
            cell.appendChild(pSpan);
        } else if (cell.classList.contains('start')) {
            // Update Start cell with value if desired, or just policy
             const vSpan = document.createElement('span');
            vSpan.classList.add('v-value');
            vSpan.style.fontSize = '0.6rem';
            vSpan.innerText = values[r][c].toFixed(1);
            
            const pSpan = document.createElement('span');
            pSpan.classList.add('policy-arrow');
            pSpan.innerText = policy[r][c];
            
            cell.innerHTML = 'S<br>';
            cell.appendChild(vSpan);
            cell.appendChild(pSpan);
        }
    });
}

function resetGrid() {
    obstacles = [[1, 1], [2, 2], [3, 3]];
    initGrid();
    document.getElementById('results').style.display = 'none';
}

// Initialize on load
initGrid();
