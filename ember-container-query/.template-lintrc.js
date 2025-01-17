'use strict';

module.exports = {
  plugins: ['ember-template-lint-plugin-prettier'],
  extends: ['recommended', 'ember-template-lint-plugin-prettier:recommended'],
  overrides: [
    {
      files: ['src/**/*.hbs'],
      rules: {
        prettier: 'off',
      },
    },
  ],
};
