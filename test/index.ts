import express from 'express';
import { AuthMiddleware, ErrorAuthMiddleware } from '../src/index';

const app = express();
const port = 11111;
app.use((req, res, next) => {
  res.locals.name = 'lishaonan@bignox.com';
  next();
});
app.use(AuthMiddleware({
  ...AuthMiddleware.OPTIONS.DEV_OPTION,
  name(req, res) {
    return res.locals.name;
  },
  api: {
    resListService: 'aabd1af03995484b8df4e93a323706e1',
  },
}));
app.use(ErrorAuthMiddleware);
app.get('/', (req, res) => res.send('Hello World!'));
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
