
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config();
const uri = "mongodb+srv://"+"--"+":"+"--"+"@realmcluster.tw26u.mongodb.net/?retryWrites=true&w=majority"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function getMaps(id){
  return client.connect().then((conn)=>{
    return conn.db("safeway")
  }).then((value)=>{
    return value.collection("mapcontracts")
  }).then((table)=>{
      return table.find({"ownerid":id}).toArray()
  }).then((ans)=>{
    
    return ans;
  }).catch((err)=>{
    console.log(err)
  });
}


async function getMapsCC(city,country){
  return client.connect().then((conn)=>{
    return conn.db("safeway")
  }).then((value)=>{
    return value.collection("mapcontracts")
  }).then((table)=>{
      return table.find({"city":city,"country":country}).toArray()
  }).then((ans)=>{
    
    return ans;
  }).catch((err)=>{
    console.log(err)
  });
}

async function addMap(name,mid,aid,owner,city,country){
  return client.connect().then((conn)=>{
    return conn.db("safeway")
  }).then((value)=>{
    return value.collection("mapcontracts")
  }).then((table)=>{
      return table.insertOne({"name":name,"mapid":mid,"alertid":aid,"ownerid":owner,"city":city,"country":country});
  }).then((ans)=>{
    
    return ans;
  }).catch((err)=>{
    console.log(err)
  });
}

exports.getMapsCC = getMapsCC;
exports.getMaps = getMaps;
exports.addMap = addMap;

