import globals from "globals";
import pluginJs from "@eslint/js";


export default [
    {languageOptions: { globals: globals.node }},
    pluginJs.configs.recommended,
    {
        rules: {
            "prefer-arrow-callback": "error",
            "indent": ["error", 4],
            "semi": ["error", "always"],
            "no-underscore-dangle": "error",
            "camelcase": ["error", {ignoreDestructuring: true}]
        }
    }
];