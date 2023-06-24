// DEADREPO

//API call if you wanna use *request* *axios* *fetch* 
//No need API key
//https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd

//Documentation
//https://www.coingecko.com/en/api/documentation


const { TwitterApi } = require('twitter-api-v2');
const fetch = require('cross-fetch');
const fs = require('fs');
const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const sharp = require('sharp');
const express = require("express")
const app = express();

require('dotenv').config();

// Initialise Twitter client
const client = new TwitterApi({
  appKey: `${process.env.consumer_key}`,
  appSecret: `${process.env.consumer_secret}`,
  accessToken: `${process.env.access_token}`,
  accessSecret: `${process.env.access_token_secret}`,
});

  //CardanoV2
  async function Cardano(){

    //If you wanna put the timestamp
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log(dateTime)

    const cgData = await CoinGeckoClient.simple.price({
      ids: 'cardano',
      vs_currencies: 'usd',
    });
    const adaUSD = Number(cgData.data.cardano.usd);

    const msg = `◤　　　　　　　　　　　  ◥
    ✦ $ADA, A MOVEMENT ！
◣　　　　　　　　　　　  ◢\n\n✦ Currently at ($${adaUSD})\n\n✦ @Cardano_CF \n\n✦ Powered by @coingecko\n\n#ADA #NFT`;

    newTweet = await client.v1.tweet(msg);


    console.log(cgData.data.cardano.usd + " ADA\n")
    console.log(`Tweeted: ($${adaUSD})`);

    
  }

app.get("/cardanoada",(req,res)=>{
  Cardano(); //calling the function
  res.send("Cardano Price Tweeted") //Giving a response back.
})

//To test on localhost
//http://localhost:3000/cardanoada

  
app.listen(3000, function() {
  console.log(' ┼ TWITTER BOT ACTIVATED ┼\n ┼ A new ERA BEGIN ┼')
  
})

