import { TennisGame } from "../domain/model/TennisGame.js";

/**
 * Unit tests for TennisGame scoring logic.
 * Tests cover standard scoring, deuce scenarios, advantage, and win conditions.
 */

describe("TennisGame", () => {
  describe("standard scoring", () => {
    test("should progress to 30-15", () => {
      const game = new TennisGame("P1", "P2");
      game.pointTo(1);
      game.pointTo(1);
      game.pointTo(2);
      expect(game.getScore()).toBe("30–15");
    });

    test("should start at love-all", () => {
      const game = new TennisGame("P1", "P2");
      expect(game.getScore()).toBe("love–love");
    });
  });

  describe("formatted score", () => {
    test("should return formatted score without winner info", () => {
      const game = new TennisGame("P1", "P2");
      game.pointTo(1);
      game.pointTo(2);
      expect(game.getFormattedScore()).toBe("15–15");
    });
  });

  describe("deuce and advantage scenarios", () => {
    test("should handle deuce, advantage and win flow", () => {
      const game = new TennisGame("P1", "P2");
      // Get to deuce
      game.pointTo(1);
      game.pointTo(1);
      game.pointTo(1);
      game.pointTo(2);
      game.pointTo(2);
      game.pointTo(2);
      expect(game.getScore()).toBe("DEUCE!");

      // Test advantage
      game.pointTo(1);
      expect(game.getScore()).toBe("Advantage P1");

      // Back to deuce
      game.pointTo(2);
      expect(game.getScore()).toBe("DEUCE!");

      // Win after deuce
      game.pointTo(1);
      game.pointTo(1);
      expect(game.getScore()).toBe("P1 wins!");
    });
  });

  describe("error handling", () => {
    test("should throw error when playing after game is won", () => {
      const game = new TennisGame("P1", "P2");
      // Win the game
      for (let i = 0; i < 4; i++) game.pointTo(1);
      // Attempt to play after win
      expect(() => game.pointTo(1)).toThrow("Game has already been won");
    });
  });
});
