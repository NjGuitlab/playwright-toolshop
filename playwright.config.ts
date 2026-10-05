import { defineConfig, devices } from '@playwright/test';
import { UI_URL, API_URL } from './config/env';


export default defineConfig({

  testDir: './tests',

  // Les tests d'un même fichier peuvent tourner en parallèle.
  fullyParallel: true,

  // En CI, un test.only oublié fait échouer le build.
  forbidOnly: !!process.env.CI,

  // On rejoue 2 fois en CI (site public = réseau parfois capricieux), jamais en local.
  retries: process.env.CI ? 2 : 0,

  // Site de démonstration partagé : on limite la charge en CI.
  workers: process.env.CI ? 2 : undefined,

  // Rapport HTML + sortie console lisible ; en CI on ajoute les annotations GitHub.
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],

  // Délai max d'un test (le site public peut être lent).
  timeout: 60_000,
  expect: { timeout: 10_000 },

  use: {
    // Trace complète (DOM, réseau, console) quand un test est rejoué : idéal pour déboguer.
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Toolshop expose des attributs data-test="..." : getByTestId() les utilisera.
    testIdAttribute: 'data-test',
  },

  projects: [
    // Tests d'API : pas de navigateur, baseURL = l'API.
    {
      name: 'api',
      testDir: './tests/api',
      use: {
        baseURL: API_URL,
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
    // Tests UI dans Chromium, baseURL = le site web.
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      use: { ...devices['Desktop Chrome'], baseURL: UI_URL },
    },
  ],

});
