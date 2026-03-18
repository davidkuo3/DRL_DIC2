from flask import Flask, render_template, request, jsonify
import numpy as np

app = Flask(__name__)

# Constants
GRID_SIZE = 5
GAMMA = 0.95
THRESHOLD = 1e-4

# Directions: Up, Down, Left, Right
ACTIONS = [(-1, 0), (1, 0), (0, -1), (0, 1)]
ACTION_ARROWS = ["↑", "↓", "←", "→"]

def value_iteration(start, end, obstacles):
    # Initialize values
    V = np.zeros((GRID_SIZE, GRID_SIZE))
    policy = np.full((GRID_SIZE, GRID_SIZE), "", dtype=object)
    
    # Target reward is handled in the iteration
    while True:
        delta = 0
        new_V = V.copy()
        
        for r in range(GRID_SIZE):
            for c in range(GRID_SIZE):
                if (r, c) == end or (r, c) in obstacles:
                    continue
                
                v = V[r, c]
                action_values = []
                
                for dr, dc in ACTIONS:
                    nr, nc = r + dr, c + dc
                    
                    # Boundary or obstacle check
                    if 0 <= nr < GRID_SIZE and 0 <= nc < GRID_SIZE and (nr, nc) not in obstacles:
                        # Success move
                        reward = 100 if (nr, nc) == end else -1
                        val = reward + GAMMA * V[nr, nc]
                    else:
                        # Hit boundary/obstacle - stay in place
                        reward = -2  # Slight penalty for invalid moves
                        val = reward + GAMMA * V[r, c]
                    
                    action_values.append(val)
                
                new_V[r, c] = max(action_values)
                delta = max(delta, abs(v - new_V[r, c]))
        
        V = new_V
        if delta < THRESHOLD:
            break
    
    # Extract Policy
    for r in range(GRID_SIZE):
        for c in range(GRID_SIZE):
            if (r, c) == end:
                policy[r, c] = "🏁"
                continue
            if (r, c) in obstacles:
                policy[r, c] = "🚫"
                continue
                
            action_values = []
            for dr, dc in ACTIONS:
                nr, nc = r + dr, c + dc
                if 0 <= nr < GRID_SIZE and 0 <= nc < GRID_SIZE and (nr, nc) not in obstacles:
                    reward = 100 if (nr, nc) == end else -1
                    val = reward + GAMMA * V[nr, nc]
                else:
                    reward = -2
                    val = reward + GAMMA * V[r, c]
                action_values.append(val)
            
            best_action_idx = np.argmax(action_values)
            policy[r, c] = ACTION_ARROWS[best_action_idx]
            
    return V.tolist(), policy.tolist()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/solve', methods=['POST'])
def solve():
    data = request.get_json()
    start = tuple(data.get('start', [0, 0]))
    end = tuple(data.get('end', [4, 4]))
    obstacles = [tuple(o) for o in data.get('obstacles', [[1, 1], [2, 2], [3, 3]])]
    
    V, policy = value_iteration(start, end, obstacles)
    return jsonify({
        'values': V,
        'policy': policy
    })

if __name__ == '__main__':
    app.run(debug=True)
