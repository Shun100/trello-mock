import express, { Router } from "express";
import * as cardController from "../controllers/cardController.js";

const router = Router();

// カード登録
router.post('/', cardController.create);

// カード取得
router.get('/', cardController.findAll);

// カード削除
router.delete('/:id', cardController.remove);

// カード更新
router.put('/', cardController.update);

export default router;