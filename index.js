const express = require('express');
require('dotenv').config()
const app = express();
app.use(express.json());

const cors = require('cors')
const {getPrivateKey} = require('./helpers/hashCalls');
const { getMaps, addMap,getMapsCC } = require('./helpers/mongo');
app.use(cors())
app.post('/getP', (req, res) => {
  
  const normalString = req.body.normalString;
    getPrivateKey(normalString).then((result)=>{
        console.log(result.retString)
        res.json({
            retString : result.retString,
            pubString:result.pubString
        })
    }
    ).catch((err)=>{
        res.status(400).json({
            error:`${err.toString()}`
        })
    })
});

app.post('/getContracts',(req,res)=>{
    console.log(req.body)
    const id = req.body.owner;
    getMaps(id).then((data)=>{
        let ans = []
        data.forEach((value,i)=>{
            
            ans.push({
                _id:value._id,
                name:value.name,
                ownerid:value.ownerid,
                city:value.city,
                country:value.country,
                alertid:value.alertid,
                mapid:value.mapid
            })
        })
        console.log(ans)
        res.json({
            result:ans
        })
    }).catch((err)=>{
        res.status(400).json({
            error:`${err.toString()}`
        })
    })
    
})

app.post('/getContractsCC',(req,res)=>{
    const city = req.body.city;
    const country = req.body.country;
    getMapsCC(city,country).then((data)=>{
        let ans = []
        data.forEach((value,i)=>{
            
            ans.push({
                _id:value._id,
                name:value.name,
                ownerid:value.ownerid,
                city:value.city,
                country:value.country,
                alertid:value.alertid,
                mapid:value.mapid
            })
        })
        console.log(ans)
        res.json({
            result:ans
        })
    }).catch((err)=>{
        res.status(400).json({
            error:`${err.toString()}`
        })
    })
    
})

app.post('/addContract',(req,res)=>{
    const name = req.body.name
    const mid = req.body.mid;
    const cid = req.body.aid;
    const owner = req.body.owner;
    const city = req.body.city;
    const country = req.body.country;
    addMap(name,mid,cid,owner,city,country).then((res)=>{
        res.json({
            result:res
        })
    }).catch((err)=>{
        res.status(400).json({
            error:`${err.toString()}`
        })
    })
    
})
app.listen(3333, () =>{
    console.log('Example app is listening on port 3333.')
});