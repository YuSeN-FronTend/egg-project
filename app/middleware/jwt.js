module.exports = (config) => {
    return async function jwt(ctx, next) {
            const token = ctx.request.header.authorization;
            let decode;
            if (token != 'null' && token) {
                try {
                    decode = ctx.app.jwt.verify(token, config.secret); // 验证token
                    await next();
                } catch (error) {
                    ctx.body = {
                        msg: 'token已过期，请重新登录',
                        code: 401,
                    }
                    return;
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: 'token不存在',
                };
                return;
            }
    }
}