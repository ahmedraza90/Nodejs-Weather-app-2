const express   = require('express')
const geo_code  = require('./utils/geo_code')
const weather   = require('./utils/weather')
const hbs       = require('hbs')
const path      = require('path')
const app       = express()

//path
const views     = path.join(__dirname,'../templates/views')
const partials  = path.join(__dirname,'../templates/partials')
const public    = path.join(__dirname,'../public')

//template engine = hbs
app.set('view engine','hbs')
app.set('views',views)
hbs.registerPartials(partials)

//loading static files
app.use(express.static(public))


app.get('',(req,res)=>{
    console.log(req.query)
    res.render('home')
})

//weather api
app.get('/weather',(req,res)=>{
    // if(!req.query.location){
    //    return res.send('404 error')
    // }
    
    geo_code(req.query.location)
    .then((resp)=>{
        weather(resp.latitude,resp.longtitude)
        .then((resp)=>{
            return res.send(resp)
        })
    })
    .catch((err)=>{
        return res.send({
            error: err
        })
    })

})
app.get('*',(req,res)=>{
    res.send('404 error')
})

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log('port number:   '+ port)
})