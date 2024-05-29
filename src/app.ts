import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './modules/product/product.route';
import { OrderRoutes } from './modules/order/order.route';
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

//application routes here
app.use('/api/products', ProductRoutes);
app.use('/api/orders', OrderRoutes);





app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
console.log(process.cwd());


const notFound = (req: Request, res:Response)=>{
  
  return res.status(400).json({
   success: false, 
   message: 'Route not found',
   error : " "
})

} 
app.use(notFound)
export default app;
