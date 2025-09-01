
import { TennisGame } from "../domain/model/TennisGame.js";

/**
 * Test Suite: TennisGame
 *
 * Comprehensive unit tests for the TennisGame domain model.
 * These tests validate the correct implementation of tennis scoring rules
 * including standard point progression, formatted score output,
 * deuce/advantage logic, and error handling.
 */
describe("TennisGame", () => {
  /**
   * Group: Standard Scoring
   *
   * Ensures the game progresses correctly through early stages
   * (love, 15, 30, 40) and returns appropriate score labels.
   */
  describe("standard scoring", () => {
    test("should progress to 30–15", () => {
      const game = new TennisGame("P1", "P2");
      game.pointTo(1);
      game.pointTo(1);
      game.pointTo(2);
      expect(game.getScore()).toBe("30–15");
    });

    test("should start at love–all", () => {
      const game = new TennisGame("P1", "P2");
      expect(game.getScore()).toBe("love–love");
    });
  });

  /**
   * Group: Formatted Score
   *
   * Verifies that the score is consistently returned in a 
   * human-readable format, without exposing internal state.
   */
  describe("formatted score", () => {
    test("should return formatted score without winner info", () => {
      const game = new TennisGame("P1", "P2");
      game.pointTo(1);
      game.pointTo(2);
      expect(game.getScore()).toBe("15–15");
    });
  });

  /**
   * Group: Deuce and Advantage Scenarios
   *
   * Tests the complex scoring logic after both players have
   * reached at least 40 points:
   * - Transition into deuce.
   * - Handling of advantage for either player.
   * - Resolution to a winner after extended play.
   */
  describe("deuce and advantage scenarios", () => {
    test("should handle deuce, advantage and win flow", () => {
      const game = new TennisGame("P1", "P2");

      // Move both players to deuce (40–40)
      game.pointTo(1);
      game.pointTo(1);
      game.pointTo(1);
      game.pointTo(2);
      game.pointTo(2);
      game.pointTo(2);
      expect(game.getScore()).toBe("Deuce");

      // Advantage Player 1
      game.pointTo(1);
      expect(game.getScore()).toBe("Advantage P1");

      // Back to deuce
      game.pointTo(2);
      expect(game.getScore()).toBe("Deuce");

      // Player 1 wins
      game.pointTo(1);
      game.pointTo(1);
      expect(game.getScore()).toBe("P1 wins");
    });
  });

  /**
   * Group: Error Handling
   *
   * Ensures the model enforces rules strictly:
   * - No points may be awarded once a player has won.
   */
  describe("error handling", () => {
    test("should throw error when playing after game is won", () => {
      const game = new TennisGame("P1", "P2");

      // Simulate a straight win for Player 1
      for (let i = 0; i < 4; i++) game.pointTo(1);

      // Attempt to continue play after win
      expect(() => game.pointTo(1)).toThrow("Game has already been won");
    });
  });
});
