import cleanup from 'rollup-plugin-cleanup';
import prettier from 'rollup-plugin-prettier';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';

const gas = {
  name: 'gas',
  renderChunk(code, chunk) {
    const exports = chunk.exports;
    if (!exports || exports.length === 0) return code;
    const wrappers = exports
      .map(exp => `function ${exp}(...args) { return $.${exp}(...args); }`)
      .join('\n');
    return code + '\n' + wrappers;
  },
};

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'iife',
    name: '$',
  },
  plugins: [
    cleanup({comments: 'none', extensions: ['.ts']}),
    nodeResolve(),
    typescript(),
    prettier({parser: 'typescript'}),
    gas,
  ],
};
