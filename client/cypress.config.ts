import { defineConfig } from 'cypress'
require('dotenv').config();

export default defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    supportFile: false,
  },
})