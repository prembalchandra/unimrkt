export default {
  config: {
    locales: ['en'],
    translations: {
      en: {
        'app.components.LeftMenu.navbrand.title': 'Unimrkt Research',
        'app.components.LeftMenu.navbrand.workplace': 'CMS Admin',
        'Auth.form.welcome.title': 'Welcome to Unimrkt CMS',
        'Auth.form.welcome.subtitle': 'Log in to manage website content',
      },
    },
    theme: {
      light: {
        colors: {
          primary100: '#fee2e2',
          primary200: '#fca5a5',
          primary500: '#cc332f',
          primary600: '#be2c28',
          primary700: '#991b1b',
          buttonPrimary500: '#cc332f',
          buttonPrimary600: '#be2c28',
        },
      },
      dark: {
        colors: {
          primary100: '#fee2e2',
          primary200: '#fca5a5',
          primary500: '#cc332f',
          primary600: '#be2c28',
          primary700: '#991b1b',
          buttonPrimary500: '#cc332f',
          buttonPrimary600: '#be2c28',
        },
      },
    },
    tutorials: false,
    notifications: { releases: false },
  },
  bootstrap() {},
};
