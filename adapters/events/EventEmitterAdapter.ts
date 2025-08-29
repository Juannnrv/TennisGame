import { EventEmitter } from 'events';

/**
 * GameEvents defines the possible events in a tennis game.
 * - 'point': A point is scored.
 * - 'advantage': A player gains advantage.
 * - 'deuce': The game reaches deuce.
 * - 'game_won': The game is won by a player.
 */
export type GameEvents = 'point' | 'advantage' | 'deuce' | 'game_won';

/**
 * EventEmitterAdapter wraps Node.js EventEmitter for tennis game events.
 * Allows emitting and listening to game-related events.
 */
export class EventEmitterAdapter {
  /**
   * Internal EventEmitter instance.
   */
  private emitter = new EventEmitter();
  
  /**
   * Emits a game event with an optional payload.
   * @param event The event type to emit.
   * @param payload Optional data to send with the event.
   */
  emit(event: GameEvents, payload?: any) {
    this.emitter.emit(event, payload);
  }

  /**
   * Registers a handler for a specific game event.
   * @param event The event type to listen for.
   * @param handler Callback function to handle the event payload.
   */
  on(event: GameEvents, handler: (payload?: any) => void) {
    this.emitter.on(event, handler);
  }
}
