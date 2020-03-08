'use strict'
const mysql = require('promise-mysql');
const config = require('../config/config');

let conn = undefined;
/**
 * 数据库连接
 */
class Connection {
  /**
   * 构造函数
   * @param {Object} config
   */
  constructor(config) {
    this.config = config;
  }

  /**
   * 获取连接池
   * @return {Promise}
   */
  getPools() {
    let pool = mysql.createPool(config.db);
    return pool;
  }
}
//此处暴露出一个连接池单例
module.exports = function (config) {
  if (!conn) {
    conn = new Connection(config).getPools();
  }
  return conn;
}
