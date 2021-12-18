/* global ENV_MODE */

import env from './env';

/**
 * 异步导入页面级组件
 * @param {String} url 相对于views文件夹的路径
 */
function asyncViewImport(url) {
  return () => import('@v/' + url);
}

/**
 * 获取当前环境参数
 * @param {String} key 环境参数key值
 */
function getEnvParams(key) {
  return env[ENV_MODE][key] || env.common[key];
}

export { asyncViewImport, getEnvParams };
