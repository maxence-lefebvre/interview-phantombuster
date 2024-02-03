export const resetLocalStorageCache = async () => {
  await fetch('/api/__mirage/reset', { method: 'POST' });
};
