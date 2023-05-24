'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async login(username) {
    const { ctx, app } = this;
    const userInfo = await app.mysql.select('user', username);
    
    return userInfo
  }
}

module.exports = UserService;
