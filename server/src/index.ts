import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => res.status(200).json({ message: 'Hello world!' }));

app.listen(port);
