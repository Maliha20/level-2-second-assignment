import  express  from "express";
import { orderController } from "./order.controller";

const router = express.Router()


//creating order api

router.post('/', orderController.createAnOrder)
router.get('/', orderController.getAllOrders )



export const OrderRoutes = router
