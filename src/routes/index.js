import express from "express";
const router = express.Router();
import v1 from "./v1/index.js";

router.use('/',v1);
router.get("/_status", (req, res, next)=>{
    next(200);
});

export default router;
