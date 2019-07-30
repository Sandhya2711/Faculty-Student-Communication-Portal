
const express=require("express")
const usermodel=require("../Modal/userModel")
const nodemailer=require("nodemailer")
const format = require('string-format')
const route=express.Router()

function getRandom(min,max)
{
  return Math.floor(Math.random() *(max-min))+min;
}

route.post("/register",(req,res)=>
{

   console.log("resgister response" ,req.body)
   
   let otp=getRandom(1000,9999);
   console.log("otp is",otp)
   console.log(req.body)
   req.body.otp=otp;

   usermodel.saveuser(req.body).then((result)=>
   {
          let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                        user: "justsample4mail@gmail.com", // generated ethereal user
                        pass: "sample@123" // generated ethereal password
                      }
            });

      mailMessage = format("<html><body><h1>Welcome CollegeWeb </h1> <hr> <b> Hello {0},<br> Your OTP is this {1}. Please Verify it.</b> </body></html>",req.body.name,otp);

      
       //send mail with defined transport object
            let info = transporter.sendMail({
                from: "justsample4mail@gmail.com", // sender address
                to: req.body.email, // list of receivers
                subject: "OTP Verification", // Subject line                
                html: mailMessage // html body
            },function(err,info)
            {
                if (err) {
                    console.log(err);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                  req.session.verifyuser = req.body.email
                  res.redirect("/user/verify")
            });
            // Send Mail End *************************
   }).catch(()=>
   {
    res.redirect("/college/regpage?r=0")
    console.log("registration error")
   })

   

  /* usermodel.saveuser(req.body,(result)=>
   {
     if(result)
     {
      let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                        user: "justsample4mail@gmail.com", // generated ethereal user
                        pass: "sample@123" // generated ethereal password
                      }
            });

      mailMessage = format("<html><body><h1>Welcome CollegeWeb </h1> <hr> <b> Hello {0},<br> Your OTP is this {1}. Please Verify it.</b> </body></html>",req.body.name,otp);

      
  //send mail with defined transport object
            let info = transporter.sendMail({
                from: "justsample4mail@gmail.com", // sender address
                to: req.body.email, // list of receivers
                subject: "OTP Verification", // Subject line                
                html: mailMessage // html body
            },function(err,info)
            {
                if (err) {
                    console.log(err);
                  } else {
                    console.log('Email sent: ' + info.response);
                  }
                  req.session.verifyuser = req.body.email
                  res.redirect("/user/verify")
            });
            // Send Mail End *************************
         
     }
     else
     {
       res.redirect("/college/regpage?r=0")
       console.log("registration error")
     } 

   })*/

 })

route.post("/login",(req,res)=>{


    usermodel.loginUser(req.body,function(result)
    {
       //console.log(result)
       if(result.length==0)
       {
       	 console.log( "login error")
         res.redirect("/college/loginpage?r=0")
       }
       else
       {
         
       	 record=result[0]
         //console.log(result)
         if(record.isVerify==0)
         {
          req.session.verifyuser=req.body.email
          res.redirect("/user/verify")
         }
         else
         {
         req.session.user=record
         
         if(record.type==2)
           res.redirect("/faculty/home") 
         else if(record.type==1)
           res.redirect("/student/home") 
        }
       } 
    })

	//console.log("User login ")
    //res.send(" yes login")

})


route.all('/verify',(req,res)=>
{
    console.log(req.method)
    if (req.method=="GET")
        res.render('verify')
    else
    { 
        otp = req.body.otp
        email = req.session.verifyuser

        usermodel.verifyuser(email,otp,()=>
        {
            res.redirect('/college/loginpage')
        })   
    }         
       
})

route.get('/logout',(req,res)=>
{
   req.session.destroy()
   res.redirect("/college/home") 
})


// route.post("/upload",(req,res)=>
// {
//     console.log("inside upload",req.files)
//      uid=req.session.user.uid;
//      type=req.sesssion.user.type;
//      console.log("type:",type)

    // fname=req.files.pic.name
    // move=req.files.pic.mv

    // fpath=path.join(__dirname,"../assets/userpic/"+uid)

    // if(!fs.existsSync(fpath))
    // {
    //   console.log("fpath ",fpath)
    //   fs.mkdirSync(fpath);
    // }

    // fpath=path.join(fpath,fname)

    // move(fpath,(err)=>
    // {
    //    if(err)
    //    {
    //       console.log("image upload error",err)
    //    }
    //    else
    //    {
    //        userModel.uploadpic(uid,fname,()=>
    //        {
              
    //           console.log("type:",type)
    //           if(type==1){
    //             res.redirect("/student/profile")
    //           }
    //           else
    //              res.redirect("/faculty/profile")
    //        })
    //    }
    // })
    
// })

module.exports=route