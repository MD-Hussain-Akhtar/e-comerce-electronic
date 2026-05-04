const express=require('express');
const Routers=express.Router();
 const {Home}=require('../controler/Home');
const  {AddStudent, postStudent, filterByClass, studentDelete, editStudent, updateStudent}  = require('../controler/AddStudent');
Routers.get('/',Home)
Routers.get('/AddStudent',AddStudent);
Routers.post('/AddStudent',postStudent);
Routers.get('/class/:className',filterByClass)
Routers.get("/delete/:id", studentDelete);
Routers.get('/edit/:id',editStudent)
Routers.post("/update/:id", updateStudent);
module.exports=Routers;