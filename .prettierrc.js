'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],

  printWidth: 80,
  singleQuote: true,

  overrides: [
    {
      files: '*.hbs',
      options: {
        printWidth: 64,
        singleQuote: false,
      },
    },
  ],
};
