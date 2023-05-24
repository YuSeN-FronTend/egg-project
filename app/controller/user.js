'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    try {
        const { ctx, app } = this;
        const { username, password } = ctx.request.body;
        // 根据用户名在数据库查找相对应的操作
        const userInfo = await ctx.service.user.login(username);
        // 没找到说明没有该用户
        if(!userInfo || !userInfo[0].id) {
          ctx.body = {
            code: 500,
            msg: '账号不存在',
            data: null
          }
          return
        }
        // 2.找到用户，并且判断输入密码与数据库中用户密码
      if (userInfo && password !== userInfo[0].password) {
          ctx.body = {
            code: 500,
            msg: '账号或密码错误',
            data: 'null'
          }
          return
        } else {
          ctx.body = {
            code: 200,
            msg: '登陆成功',
            
          }
        }

    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '登陆失败',
        data: null
      }
    }
  }
}

module.exports = UserController;
