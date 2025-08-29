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

- Programming language: Typescript and React.js
- No external frameworks required – pure logic implementation.

---

## 🎯 Purpose of the Exercise

- The aim of this task is to evaluate:

- Ability to interpret a problem and design a logical solution

- Understanding of control flow and basic data handling

- Clarity and organisation of code

- Capability to explain design decisions during an interview

---

## 👉 Out of scope:

- User interface or command-line interface

- Full tennis sets or matches beyond a single game

- Edge cases outside the normal flow of a single game
