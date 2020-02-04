const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode= require('./utils.js/geoCode')
const forecast = require('./utils.js/forecast')

const app = express()
// define paths for express config
const pubPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//set up static directory
app.use(express.static(pubPath))


// set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{

    res.render('index',{
        title: 'Weather app',
        name: 'Gavin Newton',
        date: '04.02.2020'
    })

})

app.get('/about',(req,res)=>{

    res.render('about',{

        title: 'About Me',
        name: 'Gavin Newton'

    })
})


app.get('/help',(req,res)=>{

res.render('help',{
    title: 'Help Page',
    message: 'Welcome to the help page here you will find all our faqs and useful information',
    name: 'Created by Gavin Newton',
})

})


app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })

    }

    console.log(req.query.search)

    res.send({
        products: []
    })

})





app.get('/weather',(req,res)=>{

    const address = req.query.address

    if(!address){
        return res.send({error:'please enter address'})
    }
    geoCode (address,(error, {latitude,longitude,cityDetails}={} )=>{
    
        if(error){
            return res.send({
                error
            })
        }
        
    
    forecast(latitude,longitude, (error, {temp,summary, prec, humidity}) => {
        if (error){
            return res.send({
                error:error
            })
        }
    
        res.send({
         
        address:cityDetails,
        summary:summary,
        temp:temp,
        chanceOfRain:prec,
        humidity:humidity,


        })
            
        
        
         
     })
    
    
    })

   

})

app.get('/help/*',(req,res)=>{

    res.render('404',{

        errorMessage:('help article not found'),
        title:('404 page'),
        name:('Created by Gavin Newton')
    })

})



app.get('*',(req,res)=>{
 res.render('404',{

    errorMessage:'page not found ',
    title:'404 help page',
    name:'Created by Gavin Newton'
 })

})



//app.com
//app.com/help
//app.com/about

app.listen(3000,()=>{

    console.log('Server is running on port 3000')

})