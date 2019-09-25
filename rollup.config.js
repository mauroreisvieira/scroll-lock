/* eslint-disable no-undef */
import minify from "rollup-plugin-babel-minify";
import serve from "rollup-plugin-serve";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import css from 'rollup-plugin-css-porter';

module.exports = {
    input: "src/main.js",
    output: {
        file: "dist/main.js",
        format: "esm",
    },
    plugins: [
        process.env.BUILD !== "production" ? serve() : "",
        resolve(),
        css(),
        commonjs(),
        process.env.BUILD === "production" ? minify() : "",
    ],
};
