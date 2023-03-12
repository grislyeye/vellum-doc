import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './vellum-doc.js',
  output: {
    dir: 'dist/',
  },
  plugins: [resolve(), commonjs(), babel({ babelHelpers: 'bundled' })],
};
