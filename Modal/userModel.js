const db=require("./db");
const  format=require("string-format")

var user=function()
{
    this.verifyuser = function(email,otp,callback)
    {
        db(function(connection)
        {
            if(connection!=false)
            {
                querystring = format("update user set isVerify=1 where otp={0} and mail='{1}'",otp,email)     
                connection.query(querystring,(err,obj)=>
                {
                    callback()
                })
            }
        })
    }

  this.getStudentByBranch=function(branch,callback){
    db((connection)=>{
      if(connection==false)
      {
         console.log("connection failed")        
         callback(false)
      }
      else
      {
         sqlquery=format("select * from user where type=1 and branch='{0}'",branch) 
         connection.query(sqlquery,(err,obj)=>
         {
          connection.end()
          if(err)
          {
            console.log("query error,err")
            callback(false)
          }
          else
          {
            callback(obj)
          }
         })
      }
    })
  }



   this.getFacultyByBranch=function(branch,callback){
    db((connection)=>{
      if(connection==false)
      {
         console.log("connection failed")        
         callback(false)
      }
      else
      {
         sqlquery=format("select * from user where type=2 and branch='{0}'",branch) 
         connection.query(sqlquery,(err,obj)=>
         {
          connection.end()
          if(err)
          {
            console.log("query error,err")
            callback(false)
          }
          else
          {
            callback(obj)
          }
          

         })
      }
    })
  }


  this.saveuser=function(data,callback)
  {
    return new Promise((resolve,reject)=>{
      db(function(connection)
     {
     	if(connection==false)
     	{
             reject(false);
     	}
     	else
     	{
        querystring = format("insert into user(name,mail,password,type,branch,otp) value('{0}','{1}','{2}',{3},{4},{5})",data.sname,data.email,data.password,data.type,data.branch,data.otp)     
                console.log(querystring)
    
                connection.query(querystring,(err)=>
                   {
                       //connection.end()
                       if(err){
                           console.log("register error",err)
                           reject(false);
                       }else{
                          resolve(true);
                       }
                   })
         	}
    })
     
    //  db(function(connection)
    //  {
    //  	if(connection==false)
    //  	{
    //          callback(false)
    //  	}
    //  	else
    //  	{
    //  		querystring = format("insert into user(name,mail,password,type,branch,otp) value('{0}','{1}','{2}',{3},{4},{5})",data.sname,data.email,data.password,data.type,data.branch,data.otp)     
    //         console.log(querystring)

    //         connection.query(querystring,(err)=>
    //            {
    //                //connection.end()
    //                if(err){
    //                    console.log("register error",err)
    //                    callback(false)
    //                }else{
    //                    callback(true)
    //                }
    //            })
    //  	}
    //  })
    })
  }

  this.loginUser=(data,callback)=>
  {  
  	db(function(connection)
  	{
        if(connection==false)
        {
           console.log("log in connection error")
           callback(false)
        }
        else
        {
        	sqlqr=format("select * from user where mail='{0}' and password= '{1}'",data.email,data.password)
          //console.log(sqlqr)
        	connection.query(sqlqr,(err,obj)=>
          {
            //connection.end()
        		if(err)
            {
              console.log("log in query error",err)
              callback(false)
            }
            else
        			callback(obj)
              
        	})
        }
  	})
    
  }

this.uploadpic=function(uid,fname,callback)
{
  db(function(connection)
  {
     if(connection==false){
        console.log("upload DB error")
        callback(false)
     }
     else
     {
      sqlquery=format("update user set profile_pic='{0}' where uid={1}",fname,uid)
      console.log("queryyy: ",sqlquery)
      connection.query(sqlquery,(err,result)=>
      {
        if(err)
        {
          console.log("uploadpic error",err)
        }
        else
        {
          
          callback()
        }
      })
     }
  })
}

}


 module.exports= new user()

