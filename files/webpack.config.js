'use strict';

const path = require('path'),
	DIST = path.resolve(__dirname, 'orbit/dist'),
	env = process.env.WEBPACK_ENV,
	config = {
		context: __dirname + '/orbit/src',
		entry: {
			orbit: './index.js'
		},

		resolve: {
			extensions: ['', '.js']
		},

		output: {
			path: DIST,
			filename: env === 'dist' ? 'orbit.min.js' : 'orbit.js',
			libraryTarget: 'umd',
			library: 'Orbit',
			umdNamedDefine: true
		},

		devtool: env === 'dist' ? '' : 'eval-source-map',

		module: {
			loaders: [
				{
					test: /\.js?$/,
					exclude: /(node_modules|dist)/,
					loader: 'babel',
					query: {
						cacheDirectory: true,
						presets: ['es2015', 'stage-2'],
						plugins: ['transform-runtime', 'add-module-exports', 'transform-es2015-modules-commonjs']
					}
				}
			]
		}
	};

if(env === 'dist') {
	config.plugins = [];
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true,
				warnings: false
			}
		})
	)
}

module.exports = config;
