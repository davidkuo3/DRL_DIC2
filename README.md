# Value Iteration Grid World Solver 🤖

A modern, interactive web application built with **Flask** and **Vanilla CSS** to visualize the **Value Iteration algorithm** in a Reinforcement Learning (RL) environment.

![Value Iteration Demo](https://img.shields.io/badge/RL-Value_Iteration-blueviolet?style=for-the-badge)
![Flask](https://img.shields.io/badge/Flask-v3.0+-blue?style=for-the-badge&logo=flask)

## 🌟 Features

- **Interactive 5x5 Grid**: Toggle obstacles simply by clicking on cells.
- **Visual Value Function $V(s)$**: Real-time display of the state-value function after convergence.
- **Optimal Policy Arrows**: Automatically derives and displays the best action (↑, ↓, ←, →) for every state.
- **Glassmorphism UI**: High-end, dark-themed design with smooth animations and transitions.
- **Dynamic Solving**: Instantaneous calculation of the optimal path from Start (0,0) to End (4,4).

## 🧠 The Algorithm

The application implements the **Value Iteration** algorithm to find the optimal policy:

1. **Initialization**: $V(s) = 0$ for all states.
2. **Iteration**: $V_{k+1}(s) = \max_a \sum_{s', r} p(s', r | s, a) [r + \gamma V_k(s')]$
3. **Termination**: Continues until the maximum change in value $\Delta < \theta$.
4. **Policy Extraction**: $\pi^*(s) = \arg\max_a \sum_{s', r} p(s', r | s, a) [r + \gamma V(s')]$

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Flask
- NumPy

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/davidkuo3/DRL_DIC2.git
   cd value-iteration-app
   ```

2. **Install dependencies**:
   ```bash
   pip install flask numpy
   ```

3. **Run the application**:
   ```bash
   python app.py
   ```

4. **Open in browser**:
   Navigate to `http://127.0.0.1:5000`

## 🕹️ How to Use

1. **Setup Grid**: Click on any empty cell to place or remove a **gray obstacle cell**.
2. **Solve**: Click the **"Run Value Iteration"** button.
3. **Observe**:
   - The small numbers in each cell represent the **Value Function $V(s)$**.
   - The arrows show the **Optimal Action** to take from that state to reach the goal with maximum reward.
4. **Reset**: Use the "Clear Grid" button to start over with default obstacles.

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Glassmorphism), Vanilla JavaScript.
- **Backend**: Python, Flask, NumPy.
- **Design**: Premium dark theme with Outfit and Inter Google Fonts.

---
Created for DRL_DIC2 course demo.
