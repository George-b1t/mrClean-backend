import express from 'express';

import './database/connect';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3453, () => {
  console.log('Server is run on http://localhost:3453');
});
