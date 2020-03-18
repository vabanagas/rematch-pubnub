import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json'
import replace from '@rollup/plugin-replace'

const env = process.env.NODE_ENV

export default {
  input: 'lib/index.js',
  plugins: [
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    }),
  ],
  output: [
    {
      name: '@vincit/rematch-pubnub',
      file: pkg.browser,
      format: 'umd',
      exports: 'named',
      context: 'window',
      moduleContext: { this: 'window' },
      sourcemap: true,
    }, // Universal Modules
    { file: pkg.main, format: 'cjs', exports: 'named', sourcemap: true }, // CommonJS Modules
    { file: pkg.module, format: 'es', exports: 'named', sourcemap: true }, // ES Modules
  ],
  external: ['pubnub', 'pubnub-redux', 'redux', 'redux-thunk'],
}
