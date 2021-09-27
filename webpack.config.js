const path 						= require('path');
const HtmlWebpackPlugin 		= require('html-webpack-plugin');
const { CleanWebpackPlugin }	= require('clean-webpack-plugin');
const CopyWebpackPlugin			= require('copy-webpack-plugin');
const webpack  					= require('webpack');

module.exports = (env, args) => {
	
	return {
		entry: './src/index.jsx',
		...(options()),
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					include: path.join(__dirname, 'src'),
					exclude: /node_modules/,
					use: ['babel-loader']
				},
				{
					test: /\.scss$/i,
					use: ['style-loader',
					{
						loader :'css-loader', 
						options: {
							sourceMap: true,
							modules: {
								localIdentName: '[name]_[local]'
							}
						} 
					}, 
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}],
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					use: [{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images',
							publicPath: './images'
						}
					}]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource',
				}
			],
		},
		resolve: {
			extensions: ['*', '.js', '.jsx', '.json', '.png', '.jpg', '.scss'],
			alias: {
				images: path.resolve('src/images'),
				utils: path.resolve('src/utils'),
				languages: path.resolve('src/languages')
			}
		},
		plugins: plugins(),
		output: {
			filename: '[name].bundle.js',
			path: path.resolve(__dirname, 'dist'),
			clean: true,
		}
	};
};

const plugins = () => {
	const resOut = path.resolve(__dirname, 'dist');

	const plugs = [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [resOut],
			dry: false,
		}),
		new HtmlWebpackPlugin({
			hash: false,
			filename: path.resolve(resOut, 'index.html'),
			template: './src/index.ejs',
		}),
		new webpack.ProvidePlugin({
			t: [path.resolve(__dirname, 'src/utils/Translator'), 'default']
		})
	]

	return plugs;
}

const options = () => {
	
	const ops = {
		mode: 'development',
		devtool: 'eval-source-map',
		devServer: {
			contentBase: path.resolve(__dirname, 'dist'),
			compress: true,
			port: 9000,
			historyApiFallback: true,
			openPage: '',
			hot: true,
			proxy: {
			  	'/api/**' : {
			  		target: 'http://127.0.0.1:3000',
			  		secure: false,
			 		changeOrigin: true,
			 	}
			},
			allowedHosts: [
				'localhost',
			]
		},
	};

	return ops;
}