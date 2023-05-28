'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx, app } = this;
    try {
        const { username, password } = ctx.request.body;
        if(!username || !password) {
          ctx.body = {
            code: 500,
            msg: '账号或密码为空',
            data: null
          }
          return
        }
        // 根据用户名在数据库查找相对应的操作
        const userInfo = await ctx.service.user.login(username);
        // 没找到说明没有该用户
        if(!userInfo || !userInfo.id) {
          ctx.body = {
            code: 500,
            msg: '账号不存在',
            data: null
          }
          return
        }
        // 2.找到用户，并且判断输入密码与数据库中用户密码
      if (userInfo && password !== userInfo.password) {
          ctx.body = {
            code: 500,
            msg: '账号或密码错误',
            data: 'null'
          }
          return
        } else {
          const token = app.jwt.sign({
            id: userInfo.id,
            username: userInfo.username,
            exp: Math.floor(Date.now()/1000) + (24 * 60 * 60) // token有效期为24小时
          }, app.config.jwt.secret);
          // 返回token
          if(userInfo.job === '用户') {
            ctx.body = {
              code: 200,
              msg: '登陆成功!',
              data: { 
                token,
                routeInfo: [
                  {
                    path: '/layout',
                    name: 'layout',
                    redirect: '/adminCenter',
                    children: [
                      {
                        path: '/adminCenter',
                        name: 'adminCenter',
                        component: 'group/adminCenter',
                        meta: {
                          type: 'first',
                          name: '配置中心',
                          icon: 'Setting'
                        }
                      },
                      {
                        path: '/personCenter',
                        name: 'PersonCenter',
                        component: 'group/asidefirst/personCenter',
                        meta: {
                          type: 'first',
                          name: '个人中心',
                          icon: 'UserFilled'
                        }
                      }
                    ]
                  },
                ]
               }
            }
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
  async register() {
    const { ctx, app } = this;
    try{
      const {username, password, name} = ctx.request.body;
      if(!username || !password || !name) {
        ctx.body = {
          code: 500,
          msg: '信息不可以为空',
          data: null
        }
        return
      }
      const userInfo = await ctx.service.user.getUserByName(username);
      if(userInfo && userInfo.id) {
        ctx.body = {
          code: 500,
          msg: '用户名已被注册, 请重新输入',
          data: null
        }
        return
      }
      let result = await ctx.service.user.register({
        name,
        password,
        username,
        job: '用户'
      });
      if(result) {
        ctx.body = {
          code: 200,
          msg: '注册成功!',
          data: null
        }
      } else {
        ctx.body = {
          code: 500,
          msg: '注册失败',
          data: null
        }
      }
    } catch(error) {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null
      }
    }
  }
}

module.exports = UserController;
