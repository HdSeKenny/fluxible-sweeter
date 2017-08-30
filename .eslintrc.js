module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "brace-style": 0,
    "func-names": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "comma-dangle": 0,
    "max-len": [2, 150, 2],
    "one-var": 0,
    "one-var-declaration-per-line": 0,
    "arrow-body-style": 0,
    "eol-last": 0,
    "yoda": 0,
    "eqeqeq": 0,
    "quote-props": 0,
    "react/sort-comp": 0,
    "react/prefer-es6-class": 0,
    "react/jsx-no-bind": 0,
    "react/self-closing-comp": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-boolean-value": 0,
    "react/no-find-dom-node": 0,
    "react/no-multi-comp": 0,
    "react/no-string-refs": 0,
    "react/jsx-filename-extension": 0,
    "no-else-return": 0,
    "no-console": 0,
    "import/no-extraneous-dependencies": 0,
    "global-require": 0,
    "no-mixed-operators": 0,
    "space-before-function-paren": 0,
    "padded-blocks": 0,
    "import/newline-after-import": 0,
    'new-cap': 0,
    'camelcase': 0,
    "linebreak-style": "off"
  },
  "globals": {
    "document": true,
    "navigator": true,
    "window": true,
    "$": true,
    "jQuery": true,
    "swal": true,
    "localStorage": true,
    "socket": true
  }
};