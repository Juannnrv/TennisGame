// domain/ports/IGame.ts

/**
 * Represents a player in the tennis game.
 * 1 for Player 1, 2 for Player 2.
 */
export type Player = 1 | 2;

/**
 * GameState describes the canonical state of the game (used by domain).
 */
export type GameState =
  | { type: 'progress'; scoreLabel: string } // e.g. "15–30"
  | { type: 'deuce' }
  | { type: 'advantage'; player: string }
  | { type: 'won'; player: string };

/**
 * Interface for a tennis game (domain port).
 */
export interface IGame {
  /**
   * Awards a point to the specified player.
   * @param player The player to award the point to (1 or 2).
   */
  pointTo(player: Player): void;

  /**
   * Returns the current score as a formatted string (human readable).
   */
  getScore(): string;

  /**
   * Returns the canonical GameState (useful for adapters/tests).
   */
  getState(): GameState;

  /**
   * Resets the game to its initial state.
   */
  reset(): void;

  /**
   * Returns the raw points for both players.
   */
  getRawPoints(): { p1: number; p2: number };
}
