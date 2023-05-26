'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async login(username) {
    const { ctx, app } = this;
    const userInfo = await app.mysql.get('user', { username });
    
    return userInfo
  }
  async getUserByName(username) {
    try {
      const result = await this.app.mysql.get('user', { username })
      return result;
    } catch(error) {
      console.log(error);
      return null;
    }
  }
  async register(registerInfo) {
    try{
      const result = await this.app.mysql.insert('user', registerInfo);
      return result
    } catch(error) {
      console.log(error);
      return null
    }
  }
}

module.exports = UserService;
