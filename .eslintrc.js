module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins:["es-beautifier"],
  // extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  extends: ["plugin:vue/essential", "eslint:recommended", "plugin:es-beautifier/standard"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "comma-dangle": ["error", "never"],
    "linebreak-style": "off",
    "skipBlankLines": "off",
    "space-before-function-paren":0,
    "arrow-parens":0,
  }
};
