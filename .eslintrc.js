/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    parserOptions: {
      ecmaVersion: 2022, 
      sourceType: "module", 
    },
    env: {
      node: true, 
      es2022: true, 
    },
    ignorePatterns: ["node_modules/", "dist/", "build/"], 
  
    extends: [
      "eslint:recommended", 
    ],
  
    overrides: [
      {
        files: ["**/*.ts"],
        plugins: ["@typescript-eslint"],
        parser: "@typescript-eslint/parser", 
        extends: [
          "plugin:@typescript-eslint/recommended", 
        ],
        rules: {
          "@typescript-eslint/no-unused-vars": "warn", 
          "@typescript-eslint/no-explicit-any": "warn",
        },
      },
    ],
  
    // Regras personalizadas
    rules: {
      "no-console": "warn", // Avisa sobre o uso de `console.log`
      "no-unused-vars": "warn", // Avisa sobre variáveis não utilizadas
      "no-undef": "error", // Erro ao usar variáveis não definidas
      "no-extra-semi": "error", // Erro ao usar ponto e vírgula desnecessário
      "semi": ["error", "always"], // Exige ponto e vírgula no final das declarações
      "quotes": ["error", "single"], // Exige aspas simples
      "indent": ["error", 2], // Indentação de 2 espaços
      "comma-dangle": ["error", "always-multiline"], // Vírgula no final de objetos/arrays multilinha
    },
  };