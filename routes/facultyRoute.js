const express=require("express")
const route=express.Router()
const userModel=require("../Modal/userModel")
const quesModel=require("../Modal/quesModel")

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

   userModel.getStudentByBranch(branch,(result)=>
   {
   	//console.log(result)
    res.render("faculty",{name:name,data:result,uid:uid,pic:pic})
   })

})

route.get("/logout",(req,res)=>
{
	req.session.destroy()
	res.redirect("/college/home")
})

route.get("/viewQues",(req,res)=>
{
	branch=req.session.user.branch

	quesModel.getQuestion(branch,(result)=>
	{
		if(result)
		res.render("viewQues",{data:result})
	})

})

route.get("/profile",(req,res)=>
{
   uid=req.session.user.uid
   name=req.session.user.name
   pic=req.session.user.profile_pic
   res.render("facultyprofile",{name:name,uid:uid,pic:pic})
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
              res.redirect("/faculty/profile")
           })
       }
    })
    
})

//..........................ajax...................

route.post("/addAnswer",(req,res)=>
{
	 console.log("inside ajax",req.body)
	 uid=req.session.user.uid;
	 //console.log(uid," " ,req.body.answer," ",req.body.qid)
	 quesModel.saveAnswer(uid,req.body).then((result)=>
	 {
		console.log("answer added",result);	 
	 }).catch((err)=>
	 {
		console.log("errr: answer  not added",err);
	 })
	 	
})


 module.exports=route
