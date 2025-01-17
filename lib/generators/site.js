const appRoot = require('app-root-path');
const { throwInfo, throwError } = require('../helpers/utils');

var themePack;

try {
  themePack = require(appRoot + '/node_modules/hexo-theme-aurora-s/package.json');
} catch (error) {
  throwInfo(
    'Aurora Plugin',
    `Aurora Plugin fail to get current Aurora Theme version from package location, trying to get from themes folder instead...`
  );
  try {
    themePack = require(appRoot + '/themes/aurora-s/package.json');
  } catch (error) {
    throwError(
      'Aurora Plugin Error',
      `Aurora Plugin fail to get current Aurora Theme version, please make sure you have the theme installed.`
    );
    return;
  }
}

class SiteGenerator {
  data = {};

  constructor(configs) {
    configs.theme_config.version = themePack.version;
    this.data = configs;
  }

  addSiteConfig(data) {
    const configs = this.data;
    // Removed privacy data from site configs
    delete configs.deploy;
    delete configs.server;
    data.push({
      path: 'api/site.json',
      data: JSON.stringify(configs)
    });
    return data;
  }
}

module.exports = SiteGenerator;
