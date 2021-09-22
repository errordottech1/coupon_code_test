import express from 'express';
import { checkDiscountOnCategory, checkDiscountOnProduct, checkForFullDiscount } from '../controllers/purchase.js';

const router = express.Router();

router.get('/', checkDiscountOnProduct)
router.get('/', checkDiscountOnCategory)
router.get('/', checkForFullDiscount)

export default router;