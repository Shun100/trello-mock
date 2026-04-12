import express, { Router } from "express";
import * as listController from "../controllers/listController.js"

const router = Router();

// リスト登録
router.post('/', listController.create);

// リスト全取得
router.get('/', listController.findAll);

// リスト削除
router.delete('/:id', listController.remove);

// リスト更新（複数）
router.put('/', listController.updateMany);

export default router;
