// src/environments/environment.ts

export const environment = {
  /**
   * @description Indicates if the application is running in a production environment.
   * Set to `false` for development builds.
   */
  production: false,

  /**
   * @description The base URL for your development API endpoints.
   * Typically points to a local or development server.
   */
  apiUrl: 'http://localhost:3000/api', // Example: Your local backend API

  /**
   * @description Enables or disables application-wide debugging features.
   * Set to `true` in development for console logs, dev tools, etc.
   */
  debugMode: true,

  /**
   * @description Flag to enable or disable analytics tracking (e.g., Google Analytics).
   * Usually `false` in development to avoid polluting production data.
   */
  enableAnalytics: false,

  /**
   * @description Configuration for specific features that can be toggled.
   * Useful for A/B testing, phased rollouts, or dev-only features.
   */
  featureFlags: {
    // Example: A new patient dashboard UI, enabled in dev for testing
    newPatientDashboard: true,
    // Example: A beta feature, enabled for internal testing
    betaScheduling: true,
  },

  /**
   * @description Example public key for a third-party service (e.g., Stripe, Google Maps).
   * Use test/development keys here.
   */
  stripePublicKey: 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXX', // Replace with your actual Stripe test key

  /**
   * @description Version string for the development build.
   */
  appVersion: '1.0.0-dev',

  // Add any other development-specific variables here
};