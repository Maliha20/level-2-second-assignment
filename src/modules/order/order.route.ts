import  express  from "express";
import { orderController } from "./order.controller";

const router = express.Router()


//creating order api

router.post('/create-order', orderController.createAnOrder)



export const OrderRoutes = router
