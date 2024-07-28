import express from "express"
import bodyParser from "body-parser"
import {dirname} from "path"
import {fileURLToPath} from "url"
const port=3000
const app=express()
var userIsAuthorized=false
const __dirname=dirname(fileURLToPath(import.meta.url))
app.use(bodyParser.urlencoded({extended:true}))
function  passwordCheck(req,res,next){
    const password=req.body["password"]
    if (password==="iloveprogramming"){
        userIsAuthorized=true

    }
    next()
}
app.use(passwordCheck)
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html")
})
app.post("/check",(req,res)=>{
    if (userIsAuthorized){
        res.sendFile(__dirname+"/public/secret.html")
    }
    else{
        res.sendFile(__dirname+"/public/index.html")
    }
})
app.listen(port,()=>{
    console.log("Listening on port 3000")
})
