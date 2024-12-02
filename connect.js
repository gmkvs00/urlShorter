const mongoose=require("mongoose");


async function connectToMogoDb(url){
    return mongoose.connect(url);
}

module.exports={
    connectToMogoDb,
}