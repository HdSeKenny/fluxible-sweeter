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
    "eqeqeq": 0,
    "react/sort-comp": 0,
    "react/prefer-es6-class": 0,
    "react/jsx-no-bind": 0,
    "react/self-closing-comp": 0
    //"complexity": ["error", 2]
  }
};
