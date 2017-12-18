'use strict';
const ora = require('ora');
const rm = require('rimraf');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const spinner = ora('building for production...');
spinner.start();
rm("../dist", function(err){
  if (err) {throw err;}
  webpack(webpackConfig, function(err, stats){
    spinner.stop();
    if (err){ throw err ;}
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');
    if (stats.hasErrors()) {
      console.log(chalk.red('  构建过程发生了错误.\n'));
      process.exit(1);
    };
    console.log(chalk.cyan('  构建结束.\n'));
  });
})
