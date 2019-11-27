export const environment = {
  production: false,
  hmr: false,
  application: {
    name: 'CMS',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44376',
    clientId: 'CMS_App',
    dummyClientSecret: '1q2w3e*',
    scope: 'CMS',
    showDebugInformation: true,
    oidc: false,
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44376',
    },
  },
  localization: {
    defaultResourceName: 'CMS',
  },
};
