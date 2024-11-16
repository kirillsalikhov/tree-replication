import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: './api.yml',
    output: {
      mode: 'tags-split',
      target: '../app/frontend/api/gen/api.ts',
      client: 'react-query',
      httpClient: 'fetch',
      prettier: true,
    },
  },
});
