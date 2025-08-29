import type { IGame, Player } from "./../ports/IGame.js";

/**
 * Labels for tennis scores in order: 0, 1, 2, 3 points.
 */
const SCORE_LABELS = ["love", "15", "30", "40"] as const;

/**
 * TennisGame implements the IGame interface for managing a tennis match.
 * Tracks points for two players, calculates score, and handles game state.
 */
export class TennisGame implements IGame {
  /**
   * Points for Player 1.
   */
  private p1 = 0;
  /**
   * Points for Player 2.
   */
  private p2 = 0;

  /**
   * Stores the last valid score.
   */
  private lastValidScore: string | null = null;

  /**
   * Creates a new TennisGame instance.
   * @param player1Name Name for Player 1 (default: "Player 1")
   * @param player2Name Name for Player 2 (default: "Player 2")
   */
  constructor(
    public player1Name = "Player 1",
    public player2Name = "Player 2"
  ) {}

  /**
   * Awards a point to the specified player.
   * Throws an error if the game already has a winner.
   * @param player The player to award the point to (1 or 2).
   */
  pointTo(player: Player): void {
    if (this.hasWinner()) throw new Error("Game has already been won");
    player === 1 ? this.p1++ : this.p2++;
  }

  /**
   * Returns the current score as a formatted string.
   * Handles standard tennis scoring, deuce, advantage, and win states.
   * @returns The current score.
   */
  getScore(): string {
    const winner = this.getWinner();
    if (winner) {
      return `${winner} wins!`;
    }

    // Calculate current score
    const label1 = SCORE_LABELS[Math.min(this.p1, 3)];
    const label2 = SCORE_LABELS[Math.min(this.p2, 3)];
    this.lastValidScore = `${label1}–${label2}`;

    // Handle deuce and advantage cases
    if (this.p1 >= 3 && this.p2 >= 3) {
      if (this.p1 === this.p2) return "DEUCE!";
      if (this.p1 === this.p2 + 1) return `Advantage ${this.player1Name}`;
      if (this.p2 === this.p1 + 1) return `Advantage ${this.player2Name}`;
    }

    return this.lastValidScore;
  }

  /**
   * Resets the game to its initial state.
   */
  reset(): void {
    this.p1 = 0;
    this.p2 = 0;
  }

  /**
   * Returns the raw points for both players.
   * @returns An object with the points for player 1 (p1) and player 2 (p2).
   */
  getRawPoints() {
    return { p1: this.p1, p2: this.p2 };
  }

  /**
   * Gets the formatted score without winner information
   * @returns The current score in tennis format
   */
  getFormattedScore(): string {
    const points = this.getRawPoints();
    return `${SCORE_LABELS[Math.min(points.p1, 3)]}–${SCORE_LABELS[Math.min(points.p2, 3)]}`;
  }

  /**
   * Determines the winner of the game, if any.
   * @returns The name of the winner, or null if there is no winner yet.
   */
  private getWinner(): string | null {
    const max = Math.max(this.p1, this.p2);
    const diff = Math.abs(this.p1 - this.p2);
    if (max >= 4 && diff >= 2)
      return this.p1 > this.p2 ? this.player1Name : this.player2Name;
    return null;
  }

  /**
   * Checks if the game has a winner.
   * @returns True if there is a winner, false otherwise.
   */
  private hasWinner(): boolean {
    return this.getWinner() !== null;
  }
}
