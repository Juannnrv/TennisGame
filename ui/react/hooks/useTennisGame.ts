import { useState, useCallback } from "react";
import { TennisGame } from "../../../domain/model/TennisGame.js";
import type { Player } from "../../../domain/ports/IGame.js";

/**
 * React hook for managing a tennis game state.
 * Provides score, point awarding, reset, and raw points retrieval.
 *
 * @param player1 Name for Player 1 (default: 'P1')
 * @param player2 Name for Player 2 (default: 'P2')
 * @returns An object with:
 *   - score: Current formatted score string
 *   - pointTo: Function to award a point to a player
 *   - reset: Function to reset the game
 *   - getRawPoints: Function to get raw points for both players
 */
export function useTennisGame(player1 = "P1", player2 = "P2") {
  const [game] = useState(() => new TennisGame(player1, player2));
  const [score, setScore] = useState(game.getScore());

  /**
   * Awards a point to the specified player and updates the score.
   * @param p The player to award the point to (1 or 2).
   */
  const pointTo = useCallback(
    (p: Player) => {
      game.pointTo(p);
      setScore(game.getScore());
    },
    [game]
  );

  /**
   * Resets the game and updates the score.
   */
  const reset = useCallback(() => {
    game.reset();
    setScore(game.getScore());
  }, [game]);

  /**
   * Returns the raw points for both players.
   * @returns An object with the points for player 1 (p1) and player 2 (p2).
   */
  return { score, pointTo, reset, getRawPoints: () => game.getRawPoints() };
}
