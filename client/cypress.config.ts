import { clerkSetup } from '@clerk/testing/cypress'
import { defineConfig } from 'cypress'
require('dotenv').config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.BASEURL = process.env.CYPRESS_BASE_URL
      return clerkSetup({ config })
    },
    supportFile: false,
  },
})