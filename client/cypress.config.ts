import { defineConfig } from 'cypress'
require('dotenv').config();
console.log('base url 2', process.env.CYPRESS_BASE_URL);

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    supportFile: false,
  },
})