// src/app/core/models/loading-state.type.ts

/**
 * @description
 * Type alias representing different states of a loading process.
 * 'idle': No active loading.
 * 'loading': An operation is currently in progress.
 * 'success': The last operation completed successfully.
 * 'error': The last operation failed.
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';