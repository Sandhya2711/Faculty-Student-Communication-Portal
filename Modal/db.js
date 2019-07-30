const mysql=require("mysql")


function getconnection(callback)
{

    const conn=mysql.createConnection({
      "host":"localhost",
      "user":"root",
      "password":"",
      "port":"3308",
      "database":"collegeweb"
    })  

    conn.connect((err,db)=>{
    if(err){
    	console.log("connection failed",err)
    	callback(false)
    }
     else
    {
	   console.log("connected")
	   callback(conn)
    }

  }) 
}
    
module.exports=getconnection