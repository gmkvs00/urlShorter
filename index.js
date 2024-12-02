const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMogoDb } = require("./connect");
const URL = require("./models/url");
const app = express();
const port = 8001;

connectToMogoDb('mongodb://localhost:27017/short-url')
    .then(() => console.log("connected to mongodb"));

app.use(express.json());

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
   
    const entry=await URL.findOneAndUpdate({
        shortId
    }, {
        $push: {
            visitHistory: {
                timestamp:Date.now(),
            },
        },
    });
    res.redirect(entry.redirectURL);
})

app.use("/url", urlRoute);
app.listen(port, () => { console.log(`port running on:${port}`) });