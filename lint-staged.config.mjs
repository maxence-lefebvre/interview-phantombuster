export default {
  '*.{ts,tsx}': ['nx affected:lint --fix --files'],
  '*': ['npx nx format:write --files'],
};
