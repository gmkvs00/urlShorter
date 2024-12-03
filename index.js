const express = require("express");
const path=require("path")
const urlRoute = require("./routes/url");
const { connectToMogoDb } = require("./connect");
const URL = require("./models/url");
const app = express();
const port = 8001;

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

connectToMogoDb('mongodb://localhost:27017/short-url')
    .then(() => console.log("connected to mongodb"));

app.use(express.json());

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});

    return res.render('home',{urls:allUrls});

})

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp: Date.now(),
            },
        },
    });
    res.redirect(entry.redirectURL);
})



app.use("/url", urlRoute);
app.listen(port, () => { console.log(`port running on:${port}`) });