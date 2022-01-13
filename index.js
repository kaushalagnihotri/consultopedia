var express=require("express");
var bodyParser=require("body-parser");
  
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/gfg');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})
  
var app=express()
  
  
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
  
app.post('/register', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var pass = req.body.password;
    var phone =req.body.phone;
    var organization = req.body.organization;
    var address = req.body.address;
    var country = req.body.country;
    var pincode = req.body.pincode;
    var role = req.body.role;
  
    var data = {
        "name": name,
        "email":email,
        "organization" :organization,
        "address" : address,
        "country" : country,
        "pincode" : pincode,
        "aadharNum" : aadharNum,
        "role" : role,
        "password":pass,
        "phone":phone
    }

    console.log(name + email + pass + phone);
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('login.html');
})
app.post('/login',function(req,res){
    console.log("hello");
    var Name = req.body.name;
    var pass = req.body.password;
    
    db.collection('details').find().toArray(function(err, items) {
            if(err) throw err;    
            for(let i=0;i<items.length;i++)
                {
                    if(items[i].name===Name){
                        if(items[i].password===pass)
                            {
                                console.log("valid account");
                            }
                        else{
                            console.log("invalid password");
                        }
                        
                    }
                    else{
                        console.log("invalid username")
                    }
                }
        });


  
  
app.get('/',function(req,res){
res.set({
    'Access-control-Allow-Origin': '*'
    });
return res.redirect('registration.html');
}).listen(3000)
  
  
console.log("server listening at port 3000");