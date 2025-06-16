// src/environments/environment.prod.ts

export const environment = {
  /**
   * @description Indicates if the application is running in a production environment.
   * Set to `true` for production builds.
   */
  production: true,

  /**
   * @description The base URL for your production API endpoints.
   * This should be your live server domain.
   */
  apiUrl: 'https://api.yourclinicdomain.com/api', // Example: Your live production backend API

  /**
   * @description Enables or disables application-wide debugging features.
   * Set to `false` in production for security and performance.
   */
  debugMode: false,

  /**
   * @description Flag to enable or disable analytics tracking.
   * Usually `true` in production to collect user data.
   */
  enableAnalytics: true,

  /**
   * @description Configuration for specific features that can be toggled.
   */
  featureFlags: {
    // Example: New patient dashboard UI might be active in production
    newPatientDashboard: true,
    // Example: Beta feature disabled in production
    betaScheduling: false,
  },

  /**
   * @description Example public key for a third-party service (e.g., Stripe, Google Maps).
   * Use live/production keys here.
   */
  stripePublicKey: 'pk_live_YYYYYYYYYYYYYYYYYYYYYYYY', // Replace with your actual Stripe live key

  /**
   * @description Version string for the production build.
   */
  appVersion: '1.0.0',

  // Add any other production-specific variables here
};