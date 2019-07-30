const express=require("express")
const route=express.Router()
const userModel=require("../Modal/userModel")
const quesModel=require("../Modal/quesModel")
const path=require("path")
const fs=require("fs")

route.use("",(req,res,next)=>
{
	obj=req.session.user
	if(obj==undefined)
	{
        res.redirect("/college/home")
	}
	else
	{
        next()
	}

})

route.get("/home",(req,res)=>
{

   name=req.session.user.name
   branch=req.session.user.branch
   uid=req.session.user.uid
   pic=req.session.user.profile_pic

   userModel.getFacultyByBranch(branch,(result)=>
   {
   	//console.log(result)
    res.render("student",{name:name,data:result,uid:uid,pic:pic})
   })
   
})

route.post("/upload",(req,res)=>
{
    console.log(req.files)
    uid=req.session.user.uid

    fname=req.files.pic.name
    move=req.files.pic.mv

    fpath=path.join(__dirname,"../assets/userpic/"+uid)

    if(!fs.existsSync(fpath))
    {
      console.log("fpath ",fpath)
      fs.mkdirSync(fpath);
    }

    fpath=path.join(fpath,fname)

    move(fpath,(err)=>
    {
       if(err)
       {
          console.log("image upload error",err)
       }
       else
       {
           userModel.uploadpic(uid,fname,()=>
           {
              res.redirect("/student/profile")
           })
       }
    })
    
})

route.get("/question",(req,res)=>
{
   console.log("questionnnnnn")
   uid=req.session.user.uid;
   quesModel.showAnswer(uid).then((result)=>
   {
      console.log("question answer ",result);
      res.render("question",{QAdata:result,uid:uid})	 
   }).catch((err)=>
   {
     console.log("errr: question answer  ",err);
   })
   








   //res.render("question")
})

route.get("/profile",(req,res)=>
{
   uid=req.session.user.uid
   name=req.session.user.name
   pic=req.session.user.profile_pic
   res.render("studprofile",{name:name,uid:uid,pic:pic})
})


route.get("/logout",(req,res)=>
{
	req.session.destroy()
	res.redirect("/college/home")
})


route.post("/saveques",(req,res)=>
{
   qus=req.body.qus
   uid=req.session.user.uid
   quesModel.saveQuestion(qus,uid,(result)=>
   {
      if(result)
      {
         console.log("question inserted")
         res.redirect("/student/question")
      }
      else
      	console.log("question model error")
   })
})


module.exports=route




