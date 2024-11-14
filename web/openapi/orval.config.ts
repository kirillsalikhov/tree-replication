import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: './api.yml',
    output: {
      target: '../app/frontend/api/api.gen.ts',
      // fileExtension: '.gen.ts',
      client: 'react-query',
      httpClient: 'fetch',
      prettier: true,
    },
  },
});
