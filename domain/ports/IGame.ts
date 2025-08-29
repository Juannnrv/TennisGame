/**
 * Represents a player in the tennis game.
 * 1 for Player 1, 2 for Player 2.
 */
export type Player = 1 | 2;

/**
 * Interface for a tennis game.
 */
export interface IGame {
  /**
   * Awards a point to the specified player.
   * @param player The player to award the point to (1 or 2).
   */
  pointTo(player: Player): void;

  /**
   * Returns the current score as a formatted string.
   */
  getScore(): string;

  /**
   * Resets the game to its initial state.
   */
  reset(): void;

  /**
   * Returns the formatted score without winner information
   * @returns The current score in tennis format
   */
  getFormattedScore(): string;

  /**
   * Returns the raw points for both players.
   * @returns An object with the points for player 1 (p1) and player 2 (p2).
   */
  getRawPoints(): { p1: number; p2: number };
}
