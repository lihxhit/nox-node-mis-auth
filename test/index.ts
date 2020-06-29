import express from 'express';
import AuthMiddleware from '../src/index';

const app = express();
const port = 11111;
app.use((req, res, next) => {
  res.locals.name = 'lishaonan@bignox.com';
  next();
});
app.use(AuthMiddleware({
  baseURL: 'http://10.8.1.211:10010',
  key: '5afd6f97c9f54343b2eb17cd0160507e',
  name(req, res) {
    return res.locals.name;
  },
  api: {
    resListService: 'aabd1af03995484b8df4e93a323706e1',
  },
}));
app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
