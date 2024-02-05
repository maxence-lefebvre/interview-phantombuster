import { useCallback } from 'react';

export const useClipboard = () => {
  const copy = useCallback(async (value: unknown) => {
    if (!('clipboard' in navigator)) {
      throw new Error('Clipboard API is not supported');
    }

    await navigator.clipboard.writeText(String(value));
  }, []);

  return {
    copy,
  };
};
