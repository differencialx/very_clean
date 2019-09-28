process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')

let config_webpack = environment.toWebpackConfig()

let js_rule = config_webpack.module.rules[0]
let file_rule = config_webpack.module.rules[5]

config_webpack.module.rules = []

config_webpack.module.rules.push(js_rule)
config_webpack.module.rules.push(file_rule)

config_webpack.module.rules.push(
  {
    test: /\.s?css$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  }
)

console.log(config_webpack.module.rules)
module.exports = config_webpack
