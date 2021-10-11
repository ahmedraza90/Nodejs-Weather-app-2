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
// ENVIRONMENT VARIABLES IN NODEJS
// https://www.section.io/engineering-education/nodejs-environment-variables/
// In Node.js, process.env is a global variable that is injected during runtime.
// It is a view of the state of the system environment variables. When we set an environment variable, 
// it is loaded into process.env during runtime and can later be accessed.
// When hosting your application on another service (like Heroku, Nodejitsu, and AWS), your host may independently configure the process.env.PORT variable for you
// you can set the environment variable PORT to tell your web server what port to listen on.
// process.env.PORT || 3000 means: whatever is in the environment variable PORT, or 3000 if there's nothing there.
// If you pass 3000 hard-coded to app.listen(), you're always listening on port 3000, which might be just for you, or not, depending on your requirements and the requirements of the environment in which you're running your server.
const port = process.env.PORT || 3000
app.listen(port,(port)=>{
    console.log(`server is up on ${port}`)
})
