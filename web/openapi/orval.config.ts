import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: './api.yml',
    output: {
      target: './out/api.ts',
      client: 'react-query',
    },
  },
});
