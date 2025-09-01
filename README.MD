# 🎾 Tennis Scoring System

This project implements a simple scoring system for a **single game of tennis between two players**.  
The main focus is not on building a full application with a user interface, but on modelling the scoring logic according to the rules of tennis.

---

## 📌 Challenge Overview

In tennis, the scoring within a game follows a unique sequence rather than a standard numeric count:

- **Love (0), 15, 30, 40, Game**
- If both players reach 40, the score is **Deuce**.
- From Deuce:
  - Winning a point gives a player **Advantage**.
  - Winning the next point secures the game.
  - Losing the next point returns the score to Deuce.

This project covers the following:

- ✔️ Award points to either player
- ✔️ Display the current score in a human-readable format (`"15–30"`, `"Deuce"`, `"Advantage Player 1"`, `"Player 2 wins"`)
- ✔️ Handle transitions between normal scoring, Deuce, Advantage and Game Win
- ✔️ Reset the score to start a new game

---

## 🚀 Key Features

- **Point recording**: assign points to a chosen player.
- **Readable state**: retrieve the score at any time in a tennis-friendly format.
- **Rule handling**: correct transitions between Deuce, Advantage and Win.
- **Modular design**: the logic is split into clear methods for readability and maintainability.

---

## 🛠️ Technologies

- **TypeScript** – type safety and modern language features
- **Node.js** – runtime environment
- **Jest** – testing framework
- **ts-node** – run TypeScript without compiling
- **ESLint & Prettier** – code quality and formatting

---

## 🎯 Purpose of the Exercise

The aim of this task is to evaluate:

- Ability to interpret a problem and design a logical solution
- Understanding of control flow and basic data handling
- Clarity and organisation of code

---

## 👉 Out of scope

- User interface or command-line interface (UI/CLI) for end-users
- Full tennis sets or matches beyond a single game
- Edge cases outside the normal flow of a single game

---

## 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Juannnrv/TennisGame

npm install
```

This will install the following dependencies:

### Runtime dependencies

- react – required because some TypeScript type definitions depend on it

- events – Node.js event emitter utility

### Development dependencies

- typescript – TypeScript compiler

- ts-node – run TypeScript directly without compiling

- jest – testing framework

- ts-jest – Jest transformer for TypeScript

- @types/jest – Type definitions for Jest

- @types/node – Type definitions for Node.js

- eslint – code linter

- prettier – code formatter

### Optional helper types:

- @types/react – React types (required due to runtime deps)

- @types/events – Type definitions for events

- @types/mocha – Additional testing typings (if needed)

---

## 🔧 Requirements

Make sure you have installed:

- Node.js ≥ 18

- npm ≥ 9 (comes bundled with Node.js)

---

## ▶️ Usage

Start the Console Application:

You can run the scoring simulation using the CLI entry point:

```bash
npm start
```

---

## 🧪 Running Tests

Run the unit tests with:

```bash
npm test
```

Jest will execute all test files under the tests/ directory and display detailed results.
