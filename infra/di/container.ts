import { TennisGame } from '../../domain/model/TennisGame.js';
import { InMemoryGameRepo } from '../../adapters/in-memory/InMemoryGameRepo.js';
import { EventEmitterAdapter } from '../../adapters/events/EventEmitterAdapter.js';

/**
 * Creates and configures the default dependency injection container for the tennis game app.
 * Instantiates the in-memory game repository, event emitter adapter, and a default TennisGame.
 * Saves the default game in the repository under the ID 'game-1'.
 *
 * @returns An object containing:
 *   - repo: The in-memory game repository
 *   - events: The event emitter adapter
 *   - game: The default TennisGame instance
 */
export function createDefaultContainer() {
  const repo = new InMemoryGameRepo();
  const events = new EventEmitterAdapter();
  const game = new TennisGame('P1','P2');

  repo.save('game-1', game);

  return { repo, events, game };
}
