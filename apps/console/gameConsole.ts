/**
 * 🎾 Tennis Game Console Interface
 * 
 * This module implements a console-based interface to manage the flow
 * of a tennis game. It allows user interaction through keyboard inputs
 * and displays the game state in real-time.
 * 
 * Main features:
 * - Show welcome message and game instructions.
 * - Handle user input (player 1, player 2, or quit).
 * - Display current score and game state.
 * - Indicate special states like "Deuce", "Advantage", and "Game Over".
 * 
 * @module gameConsole
 */

import { TennisGame } from '../../domain/model/TennisGame.js';
import * as readline from 'readline';

/**
 * Display configuration for the game console.
 * Defines borders, titles, emojis, and state messages.
 */
const DISPLAY = {
  BORDER: '--------------------------------',
  TITLE: '🎾 Tennis Game Score 🎾',
  STAR: '🌟',
  SPACE: '  ',
  PLAYERS: {
    P1: 'Player 1 🎾',
    P2: 'Player 2 🏸'
  },
  STATES: {
    DEUCE: '⚡ DEUCE! The tension builds! ⚡',
    ADVANTAGE: '🔥 Advantage! Next point could win! 🔥',
    GAME_OVER: '🏆 Game Over! 🏆',
    QUIT: '👋 Thanks for playing! 🎾🎾🎾'
  }
} as const;

/**
 * Class that manages the console interface for the tennis game.
 * Encapsulates user interaction logic and score visualization.
 */
class TennisConsole {
  private rl: readline.Interface;
  private game: TennisGame;

  /**
   * Initializes the console interface and creates a new game instance.
   */
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.game = new TennisGame(DISPLAY.PLAYERS.P1, DISPLAY.PLAYERS.P2);
  }

  /**
   * Shows the welcome message, instructions, and initial score.
   * 
   * @private
   */
  private showWelcome(): void {
    console.clear();
    console.log(`\n\n${DISPLAY.TITLE}`);
    console.log(DISPLAY.BORDER);
    console.log('Current score:', this.game.getScore());
    console.log('\n📢 Game Instructions:');
    console.log(`• Enter 1 for ${DISPLAY.PLAYERS.P1}`);
    console.log(`• Enter 2 for ${DISPLAY.PLAYERS.P2}`);
    console.log('• Enter q to quit');
    console.log(`${DISPLAY.BORDER}\n`);
  }

  /**
   * Displays the current score and highlights the active player.
   * Also shows special states like "Deuce" or "Advantage".
   * 
   * @param activePlayer - The player who scored the last point (1 or 2).
   * @private
   */
  private showScore(activePlayer?: number): void {
    console.clear();
    const points = this.game.getRawPoints();
    console.log(`\n${DISPLAY.TITLE}`);
    console.log(DISPLAY.BORDER);
    
    console.log(`${activePlayer === 1 ? DISPLAY.STAR : DISPLAY.SPACE} ${DISPLAY.PLAYERS.P1} --- ${points.p1}`);
    console.log(`${activePlayer === 2 ? DISPLAY.STAR : DISPLAY.SPACE} ${DISPLAY.PLAYERS.P2} --- ${points.p2}`);
    console.log(DISPLAY.BORDER);

    const score = this.game.getScore();
    if (score.includes('wins')) {
      console.log(`\n${DISPLAY.STATES.GAME_OVER}`);
      console.log('Final Score:', score);
      console.log("\n");
    } else {
      console.log('Current score:', score);
      if (score.includes('DEUCE')) {
        console.log(DISPLAY.STATES.DEUCE);
      } else if (score.includes('Advantage')) {
        console.log(DISPLAY.STATES.ADVANTAGE);
      }
    }
  }

  /**
   * Handles user input and game flow.
   * Accepts player input and assigns the point,
   * or exits the game if "q" is entered.
   * 
   * @private
   */
  private async promptPlayer(): Promise<void> {
    if (this.game.getScore().includes('wins')) {
      this.showScore();
      this.rl.close();
      return;
    }

    this.rl.question('\n🎯 Enter player number (1 or 2) to score a point, or q to quit: ', (answer) => {
      console.clear();

      if (answer.toLowerCase() === 'q') {
        console.log("\n");
        console.log(DISPLAY.STATES.QUIT);
        console.log("\n");
        this.rl.close();
        return;
      }

      const player = parseInt(answer);
      if (player === 1 || player === 2) {
        try {
          this.game.pointTo(player);
          this.showScore(player);
        } catch (error) {
          console.log('❌ Error:', error instanceof Error ? error.message : String(error));
        }
      } else {
        console.log('❌ Invalid input. Please enter 1 or 2.');
      }

      this.promptPlayer();
    });
  }

  /**
   * Starts the console interface and shows the welcome message.
   */
  public start(): void {
    this.showWelcome();
    this.promptPlayer();
  }
}

// Start the game when this script runs
new TennisConsole().start();
