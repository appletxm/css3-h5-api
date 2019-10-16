import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
// import { uglify } from 'rollup-plugin-uglify'

// console.info('*************', process.env, process.argv)

const plugins = [
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true
  }),
  commonjs(),
  resolve(),
  // uglify()
]


export default {
  input: 'src/hf-js-sdk.js',
  output: {
    file: 'build/hf-js-sdk.js',
    format: 'umd',
    name: 'HFAgent',
    sourceMap: 'inline'
  },
  plugins: plugins
}
