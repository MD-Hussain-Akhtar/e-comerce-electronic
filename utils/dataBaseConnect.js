const { MongoClient } = require("mongodb");


let _db;
const mongoConnect=async ()=>{
    const client=await MongoClient.connect('mongodb://localhost:27017');
    _db=client.db("allStudentDetails");
    console.log("mongodb is  connected")
};

const getDB=()=>{
if(!_db){
    throw "No dataBase Found"
}
return _db;
};


module.exports={mongoConnect,getDB};