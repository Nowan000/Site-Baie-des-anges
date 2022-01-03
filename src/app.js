import express from 'express';
import createRoutes from './routes';
import * as path from 'path';

const app = express();
const port = 8080;

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));
app.use(createRoutes());

app.listen(port, () => console.log(`Port = ${port}`));