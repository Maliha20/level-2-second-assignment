import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

//creating a product data- api
router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllProducts);
router.get('/:productId', ProductControllers.getAProduct);
router.put('/:productId', ProductControllers.updateAProduct);
router.delete('/:productId', ProductControllers.deleteAproduct);

export const ProductRoutes = router;
