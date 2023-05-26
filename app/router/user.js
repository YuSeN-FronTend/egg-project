'use script'

module.exports = app => {
    const { router, controller } = app;
    router.post('/user/login', controller.user.login);
    router.post('/user/register', controller.user.register)
}