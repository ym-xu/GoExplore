import express from 'express';

const router = express.Router();

// 假设 indexData 处理函数已定义
const { indexData } = require('../services/indexDataService');

router.post('/', async (req, res, next) => {
    try {
        // 调用服务层处理数据
        await indexData(req.body);
        res.status(200).json({ message: 'Data indexed successfully' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;