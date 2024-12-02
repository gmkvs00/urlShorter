const express=require('express');
const URL=require("../models/url");
const {handleGenerateNewShortUrl}=require("../controllers/url")
const router=express.Router();

router.post('/',handleGenerateNewShortUrl);

module.exports=router;