'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async getData() {
    const { ctx }  = this;
    const data = {
      name: 'zj',
      age: 23
    };
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data
    }
  }
}

module.exports = HomeController;
