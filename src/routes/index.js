import express from "express";
const router = express.Router();
import v1 from "./v1/index.js";
import helpers from "../miscellenous/helpers.js"

router.use("/",v1);
router.get("/_status", (req, res, next)=>{
    return next(helpers.statusCodes.SUCCESS);
});

export default router;
