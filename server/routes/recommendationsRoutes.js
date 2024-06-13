import express from 'express';
import { getRecommendation } from '../services/ragService.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const query = req.query.query; // 从查询字符串获取用户查询
        const recommendation = await getRecommendation(query);
        res.status(200).json({ recommendation });
    } catch (error) {
        next(error);
    }
});

module.exports = router;