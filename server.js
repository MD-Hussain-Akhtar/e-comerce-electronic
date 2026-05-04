 const express=require('express')
const app=express();
const path=require('path')
const allRouters=require('./router/allRouters');
const { mongoConnect } = require('./utils/dataBaseConnect');
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

app.use('/',allRouters);
const PORT=3000;


mongoConnect().then(()=>{
app.listen(PORT,()=>{
    console.log("your Server is connected https:localhost",PORT)
});
});
