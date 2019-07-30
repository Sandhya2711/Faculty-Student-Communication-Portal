const db=require("./db")
const format=require("string-format")

var ques=function()
{
	this.saveQuestion=function(qus,uid,callback)
	{
		db(function(connection)
		{
            if(connection==false)
            {
                callback(false)
            }
            else
            {
            	sqlquery=format("insert into question(qus,ask_by)value('{0}',{1})",qus,uid)
            	console.log(sqlquery)
            	connection.query(sqlquery,(err)=>
            	{
            		connection.end()
                    if(err)
                    {
                        console.log("ques query error",err)
                    	callback(false)
                    }
                    else
                    {
                    	callback(true)
                    }
            	})
            }
		})
	}


	this.getQuestion=function(branch,callback)
	{
		db(function(connection)
		{
			if(connection==false)
			{
				callback(false)
			}
			else
			{
				sqlquery=format("SELECT qid,qus,qus_date,name from user,question where ask_by in(select uid from user where branch={0} and type=1 ) and user.uid=question.ask_by ",branch)
			    connection.query(sqlquery,(err,result)=>
                {
                    connection.end()
                    if(err)
                    {
                        console.log("getQus error",err)
                        callback(false)
                    }
                    else
                    {
                        callback(result)
                    }
                })

            }
		})
	}

	this.saveAnswer=function(uid,data)
	{
		console.log("data",data);
		return new Promise((resolve,reject)=>
		{
			db(function(connection)
			{
				if(connection==false)
				{
                      reject(false);
				}
				else
				{
					   querystring=format("insert into answer(ans,qus,ans_by) values('{0}','{1}','{2}')",data.answer,data.qid,uid);
					console.log(querystring);  
					   connection.query(querystring,(err)=>
					   {
							  if(err)
							  {
								reject(false);  
							  }
							  else
							  {
								  resolve(true);
							  }
					   })
				}
			})
		})
	}


this.showAnswer=function(uid)
{
	console.log(" inside fun showAnswer userid",uid)
	return new Promise((resolve,reject)=>
	{
		 db(function(connection)
		 {
			if(connection==false)
			{
				reject(false)
			}
			else
			{    //SELECT ans,ans_date,qid,user.name FROM `answer`,`question`,`user` WHERE answer.qus in(select qid from question where ask_by=1) and answer.qus=question.qid and user.uid=ans_by
				//SELECT ans,ans_date,qid FROM `answer`,`question` WHERE answer.qus in(select qid from question where ask_by=1) and answer.qus=question.qid
				var sqlquery=format("SELECT ans,ans_date,question.qus,user.name,user.profile_pic FROM `answer`,`question`,`user` WHERE answer.qus in(select qid from question where ask_by='{0}') and answer.qus=question.qid and user.uid=ans_by",uid)
				connection.query(sqlquery,(err,result)=>
				{
					connection.end();
					if(err)
					{
						console.log("error in query",err)
						reject(false);
					}
					else
					{
						console.log(result);
                        resolve(result);
					}
				})
			}
		 })
	})
}
}

module.exports=new ques()