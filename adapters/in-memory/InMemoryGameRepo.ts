import type { IGame } from "../../domain/ports/IGame.js";

/**
 * InMemoryGameRepo provides an in-memory storage for tennis games.
 * Uses a Map to associate game IDs with IGame instances.
 */
export class InMemoryGameRepo {
  /**
   * Internal store mapping game IDs to IGame instances.
   */
  private store = new Map<string, IGame>();

  /**
   * Saves a game instance under the specified ID.
   * @param id Unique identifier for the game.
   * @param game The IGame instance to store.
   */
  save(id: string, game: IGame): void {
    this.store.set(id, game);
  }

  /**
   * Retrieves a game instance by its ID.
   * @param id Unique identifier for the game.
   * @returns The IGame instance if found, otherwise undefined.
   */
  get(id: string): IGame | undefined {
    return this.store.get(id);
  }
}
