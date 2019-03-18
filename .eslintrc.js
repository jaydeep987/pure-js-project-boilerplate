module.exports = {
  "extends": "airbnb",
  "plugins": [ "mocha" ],
  "parserOptions": {
    "sourceType"  : "script",
    "globalReturn": true,
  },
  "globals": {
    "__DEBUG__": false,
    "sinon": true,
    "expect": true,
    "assert": true,
  },
  "env": {
    "browser": true,
    "mocha": true
  },
  "rules": {
    "key-spacing": ["error", {
      "align": "colon"
    }],
    "strict": ["error", "function"],
    "spaced-comment": ["error", "always", {
      "exceptions": ["/"],
    }],
    "prefer-destructuring": "off",
    "max-len": ["error", {
      "code"                  : 200,
      "ignoreTrailingComments": true,
      "ignoreUrls"            : true,
    }],
    "no-unused-vars": ["error", {
      "args": "none",
    }],
    "no-param-reassign": 0,
    "no-var": "off",  // unless a transpiler is used
    "no-use-before-define": ["error", {
      "functions": false,
    }],
    "guard-for-in": "off",
    "prefer-arrow-callback": "off", // unless a transpiler is used
    "prefer-template": "off",       // unless a transpiler is used
    "object-shorthand": "off",      // unless a transpiler is used
    "prefer-rest-params": "off",    // unless a transpiler is used
    "no-underscore-dangle": "off",  // Rmodules,
    "no-plusplus": "off",           //
    "prefer-spread": "off",         // unless a transpiler is used
    "no-restricted-syntax": [       // allows for-in
      "error",
      "ForOfStatement",
      "LabeledStatement",
      "WithStatement",
    ],
  }
};
