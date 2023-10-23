export default {
  '*.{ts,tsx}': ['eslint --fix', 'eslint'],
  '**/*.ts?(x)': () => 'npm run check-types',
  // '*.json': ['prettier --write']
}
