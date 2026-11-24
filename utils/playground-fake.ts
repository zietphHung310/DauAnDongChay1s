// tslint:disable
/* eslint-disable */

/**
 * Standalone offline browser mock replacing FakePlaygroundSDK.
 * Zero external network calls, zero external scripts, pure local memory/storage state.
 */
export class FakePlaygroundSDK {
  private isInitialized = false;

  async init(
    _onGameEvent?: (event: unknown) => void,
    _onPlayerPresence?: (presence: unknown) => void,
    _onLobbyStatus?: (status: unknown) => void,
    _onError?: (error: unknown) => void,
  ): Promise<void> {
    this.isInitialized = true;
  }

  createLobby(callback?: (lobbyInfo: Record<string, unknown>) => void): void {
    if (typeof callback === 'function') {
      callback({
        lobbyId: 'local-lobby',
        gameId: 'hau-le-phieu-luu-ky',
        minPlayers: 1,
        maxPlayers: 1,
        state: 'GAME_IN_PROGRESS',
        status: 'GAME_IN_PROGRESS',
        players: [],
      });
    }
  }

  getLobby(
    arg1?: unknown,
    arg2?: (lobbyInfo: Record<string, unknown>) => void,
  ): void {
    const callback = typeof arg1 === 'function' ? arg1 : arg2;
    if (typeof callback === 'function') {
      callback({
        lobbyId: 'local-lobby',
        gameId: 'hau-le-phieu-luu-ky',
        minPlayers: 1,
        maxPlayers: 1,
        state: 'GAME_IN_PROGRESS',
        status: 'GAME_IN_PROGRESS',
        players: [],
      });
    }
  }

  updatePlayerPresence(
    arg1?: unknown,
    arg2?: unknown,
    arg3?: unknown,
  ): void {
    const callback =
      typeof arg1 === 'function'
        ? arg1
        : typeof arg2 === 'function'
          ? arg2
          : typeof arg3 === 'function'
            ? arg3
            : undefined;
    if (typeof callback === 'function') {
      (callback as (ok: boolean) => void)(true);
    }
  }

  startGame(_lobbyId?: string): void {
    if (!this.isInitialized) {
      this.isInitialized = true;
    }
  }

  sendGameEvent(_eventData: unknown): void {}

  scoreUpdated(scoreData: {value?: number; level?: string}): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(
          'hlplk_progress',
          JSON.stringify({
            score: scoreData?.value ?? 0,
            level: Number(scoreData?.level ?? 1) || 1,
          }),
        );
      }
    } catch {
      // Ignore storage quota / privacy mode errors
    }
  }

  levelComplete(_level: number | string, _options?: {isFinal?: boolean}): void {}

  gameOver(_lobbyId?: string): void {}

  pauseStateChanged(_isPaused: boolean): void {}

  showLeaderboard(_lobbyId?: string): void {}
}
