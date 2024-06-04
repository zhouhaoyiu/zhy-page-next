import Koa from 'koa';
// router
const Router = require('koa-router');
const app = new Koa();
console.log(123);
// 响应
const router = new Router();
// router.get;
router.get('/', (ctx) => {
  ctx.body = 'Hello Koa';
});
app.use((ctx) => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);
