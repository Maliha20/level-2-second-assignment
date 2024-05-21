import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router()


//creating a product data- api
router.post('/create-product', ProductControllers.createProduct)


export const ProductRoutes = router