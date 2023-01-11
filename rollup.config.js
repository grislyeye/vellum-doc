import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';
import commonjs from '@rollup/plugin-commonjs';

const baseConfig = createBasicConfig({
  developmentMode: process.env.ROLLUP_WATCH === 'true',
});

export default merge(baseConfig, {
  input: './vellum-doc.js',
  output: { dir: 'dist/' },
  plugins: [commonjs()]
});
