
import type { IGame, Player, GameState } from "./../ports/IGame.js";

/**
 * Immutable labels used for the first four point values in tennis:
 * 0, 1, 2, and 3 points.
 */
const SCORE_LABELS = ["love", "15", "30", "40"] as const;

/**
 * Class: TennisGame
 *
 * Implementation of the IGame interface representing a single tennis game.
 *
 * The class encapsulates the rules of tennis scoring for two players, 
 * providing functionality to:
 * - Award points to players.
 * - Determine the current game state (progress, deuce, advantage, win).
 * - Retrieve human-readable score representations.
 * - Reset the game to its initial state.
 *
 * This class acts as the domain model and serves as the canonical 
 * source of truth for the game state.
 */
export class TennisGame implements IGame {
  /** Internal raw point counter for Player 1. */
  private p1 = 0;

  /** Internal raw point counter for Player 2. */
  private p2 = 0;

  /**
   * Constructs a TennisGame instance with optional player names.
   *
   * @param player1Name - Display name for Player 1 (default: "Player 1").
   * @param player2Name - Display name for Player 2 (default: "Player 2").
   */
  constructor(
    public player1Name = "Player 1",
    public player2Name = "Player 2"
  ) {}

  /**
   * Awards a point to the specified player.
   *
   * @param player - Identifier for the player (1 or 2).
   * @throws Error if the game has already been won.
   */
  pointTo(player: Player): void {
    if (this.hasWinner()) throw new Error("Game has already been won");
    player === 1 ? this.p1++ : this.p2++;
  }

  /**
   * Returns the current score as a human-readable string.
   * Delegates to {@link getState} for canonical game state resolution.
   *
   * @returns A formatted score string (e.g. "15–30", "Deuce", "Advantage Player 1").
   */
  getScore(): string {
    const state = this.getState();
    switch (state.type) {
      case "deuce":
        return "Deuce";
      case "advantage":
        return `Advantage ${state.player}`;
      case "won":
        return `${state.player} wins`;
      case "progress":
        return state.scoreLabel;
    }
  }

  /**
   * Computes and returns the canonical game state.
   * This method consolidates the scoring rules of tennis and should 
   * be treated as the single source of truth for consumers.
   *
   * @returns A {@link GameState} object describing the current state.
   */
  getState(): GameState {
    const winner = this.getWinner();
    if (winner) {
      return { type: "won", player: winner };
    }

    // Handle deuce and advantage
    if (this.p1 >= 3 && this.p2 >= 3) {
      if (this.p1 === this.p2) return { type: "deuce" };
      if (this.p1 === this.p2 + 1) return { type: "advantage", player: this.player1Name };
      if (this.p2 === this.p1 + 1) return { type: "advantage", player: this.player2Name };
    }

    // Normal scoring
    const label1 = SCORE_LABELS[Math.min(this.p1, 3)];
    const label2 = SCORE_LABELS[Math.min(this.p2, 3)];
    return { type: "progress", scoreLabel: `${label1}–${label2}` };
  }

  /**
   * Resets the game to its initial state (both players on 0 points).
   */
  reset(): void {
    this.p1 = 0;
    this.p2 = 0;
  }

  /**
   * Retrieves the raw point counters for both players.
   * Intended for debugging or advanced usage.
   *
   * @returns An object with numerical point values: { p1, p2 }.
   */
  getRawPoints() {
    return { p1: this.p1, p2: this.p2 };
  }

  /**
   * Evaluates whether there is a winner under tennis rules.
   *
   * @returns The winning player's name, or null if no winner yet.
   */
  private getWinner(): string | null {
    const max = Math.max(this.p1, this.p2);
    const diff = Math.abs(this.p1 - this.p2);
    if (max >= 4 && diff >= 2) {
      return this.p1 > this.p2 ? this.player1Name : this.player2Name;
    }
    return null;
  }

  /**
   * Indicates whether the game has already been won.
   *
   * @returns True if a winner exists, otherwise false.
   */
  private hasWinner(): boolean {
    return this.getWinner() !== null;
  }
}
