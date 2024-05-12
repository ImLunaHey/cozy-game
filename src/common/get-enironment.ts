type Environment = 'web' | 'desktop';

export const getEnvironment = () => {
  if ('__TAURI_IPC__' in window) {
    return 'desktop';
  }

  return 'web';
};
