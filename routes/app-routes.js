import express, { Router } from "express";
import { postpaymentdetails, Getloanreport, cookieval, loginfun, rootFun,GetTransections } from "../controllers/app-controller.js";
import { registerfun } from "../controllers/app-controller.js";
const router = express.Router();
// import express from "express";
import cookieParser from "cookie-parser";
// const app=express();
router.use(cookieParser());
// router.use(express.urlencoded({ extended: true}));

// get request
router.get("/",rootFun);
router.post("/api/cookie",cookieval);


// Post request
router.post("/api/register",registerfun);
router.post("/api/login",loginfun);
router.post("/api/transections",GetTransections);
router.post("/api/loanreport",Getloanreport);
router.post("/api/postpaymentdetails",postpaymentdetails);


export default router;
