
const express = require('express')
const route = express.Router()

route.get("/",(req,res)=>
{
    res.render('home')
})

route.get("/home",(req,res)=>
{
    res.render('home')
})

route.get("/about",(req,res)=>
{
    res.render('about')
})

route.get("/contact",(req,res)=>
{
    res.render('contact')
})

route.get("/regpage",(req,res)=>
{
	msg=""
	if(req.query.r == 0)
	{
		msg="Registration failed !"
	}
    res.render('register',{msg:msg})
})

route.get("/loginpage",(req,res)=>
{
	msg=""
	if(req.query.r == 0)
	{
		msg="Login failed!"
	}
    res.render('login',{msg:msg})
})


module.exports = route