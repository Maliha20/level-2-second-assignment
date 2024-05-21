import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/product/product.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());


//application routes here
app.use('/api/products/', ProductRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
console.log(process.cwd());

export default app;
