# Number Guessing Game

A small browser game where you guess a secret number between 1 and 100. It is built with plain HTML, CSS and JavaScript, with no build step, server or external dependency.

## Features

- Random secret number between 1 and 100
- Too high / too low hints after each guess
- Live range hint that narrows with every guess
- Attempt counter and best score saved in browser local storage
- Guess history with colour-coded chips
- Input validation for whole numbers in range
- New game button to play again
- Responsive desktop and mobile layout

## Files

- `index.html` - page structure, stats, form and history
- `styles.css` - responsive layout, chips and feedback colours
- `script.js` - game logic, hints, best score and state

## How to run

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. Type a guess and press Enter or the Guess button.

No account, package install or server is required.

## How it works

The page picks a random number from 1 to 100. Each guess is compared to the secret and you get a too high or too low hint, and the possible range shrinks accordingly. When you guess correctly, your attempt count is saved as your best score if it beats the previous one.

## Testing

The project was checked in a browser with functional tests for low, high and winning guesses, range narrowing, attempt counting, validation, history chips, best score persistence, new game behavior and reload persistence. Desktop and mobile layouts were visually inspected.

## Note

This project was built with the help of an AI assistant (Instinct) as a learning project.
