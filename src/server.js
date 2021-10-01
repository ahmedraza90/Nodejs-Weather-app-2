const express  = require('express')
const geo_code = require('./utils/geo_code')
const weather  = require('./utils/weather')
const path =require('path')

const app = express()

const views  = path.join(__dirname,'../templates/views')
const public = path.join(__dirname,'../public')

app.use(express.static(public))

app.set('view engine','ejs')//https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application
app.set('views',views)

app.get('/home',(req,res)=>{
    res.render('home',{
        title:'home page'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about page'
    })
})
app.get('/contact',(req,res)=>{
    res.render('contact',{
        title:'contact page'
    })
})


//weather api
app.get('/weather',(req,res)=>{
    geo_code(req.query.location)
    .then((ress)=>{
        
        weather(ress.longtitude,ress.latitude)
        .then((data)=>{
            res.send(data)
        })
    })
    .catch((err)=>{
        res.send({
            error:err
        })
    })
})

app.listen(3000)