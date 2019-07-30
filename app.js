const express=require("express")
const path=require("path")
const bodyParser=require("body-parser")
const fileupload=require("express-fileupload")
var session=require("express-session") 
var cookie=require("cookie-parser")

const webRoute=require("./routes/webRoute")
const userRoute=require("./routes/userRoute")
const facultyRoute=require("./routes/facultyRoute")
const studRoute=require("./routes/studRoute")

const app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookie())
app.use(fileupload())
app.use(session({secret:"qwerty"}))


app.use("/college",webRoute)
app.use("/user",userRoute)
app.use("/student",studRoute)
app.use("/faculty",facultyRoute)

app.use(express.static(path.join(__dirname,"/assets")))
app.set("view engine","ejs")



app.listen(1111,()=>{ console.log("server running at 1111")})
