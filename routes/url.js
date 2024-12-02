const express=require('express');
const URL=require("../models/url");
const {handleGenerateNewShortUrl,handleGetAnalytics}=require("../controllers/url")
const router=express.Router();

router.post('/',handleGenerateNewShortUrl);

router.get("/analytics/:short",handleGetAnalytics);
module.exports=router;