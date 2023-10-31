const appRoot = require('app-root-path');
const chalk = require('chalk');
const pluginPack = require('./package.json');
const { throwInfo, throwError } = require('./lib/helpers/utils');

require('./lib/highlighter')(hexo);
require('./lib/filters')(hexo);
require('./lib/generators')(hexo);
require('./lib/injector')(hexo);
require('./lib/commands')(hexo);

var themePack;

try {
  themePack = require(appRoot + '/node_modules/hexo-theme-aurora-s/package.json');
} catch (error) {
  throwInfo(
    'Aurora Plugin',
    `Aurora Plugin fail to get current Aurora Theme version from package location, trying to get from themes folder instead...`
  );
  try {
    themePack = require(appRoot + '/themes/aurora/package.json');
  } catch (error) {
    throwError(
      'Aurora Plugin Error',
      `Aurora Plugin fail to get current Aurora Theme version, please make sure you have the theme installed.`
    );
    return;
  }
}

hexo.on('generateAfter', function () {
  console.log(
    chalk.green('INFO  ') +
      chalk.yellow('API data generated with ') +
      chalk.cyan.bold('hexo-plugin-aurora-s') +
      chalk.magenta(' v' + pluginPack.version)
  );
});

hexo.on('exit', function () {
  console.log(
    chalk.green('INFO  ') +
      'Thanks for using: ' +
      chalk.cyan.bold('hexo-plugin-aurora-s') +
      chalk.magenta(' v' + pluginPack.version) +
      ' & ' +
      chalk.cyan.bold('hexo-theme-aurora-s') +
      chalk.magenta(' v' + themePack.version)
  );
  console.log(chalk.green('INFO  ') + 'Crafted by ' + chalk.cyan.bold('bennyxguo <三钻> & Tim'));
  console.log(chalk.red('INFO  ') + '注意⚠' + chalk.cyan.bold('如果html生成步骤有warning，请将_config.yml中的主题设为hexo-theme-aurora-s同时将配置文件重命名为_config.aurora-s.yml'));
});
