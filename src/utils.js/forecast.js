const request = require('request')


const forecast = (lat,long,callback)=>{
    

    //const url = 'https:////api.darksky.net/forecast/ed7a4701fa733fc5a5aafd591eaa3e50/'+encodeURIComponent(long)+','+encodeURIComponent(lat)+'?units=si&lang=en'
    const url = 'https://api.darksky.net/forecast/ed7a4701fa733fc5a5aafd591eaa3e50/'+encodeURIComponent(lat)+','+encodeURIComponent(long)+'?units=si&lang=en'

    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Error found please check your internet connection',undefined)
        }else if(body.error){
            callback(' Error found when requesting weather data, please revise your data and try again',undefined)
        }else{

            callback(undefined,{
             temp: body.currently.temperature,
             prec: body.currently.precipProbability,
             humidity: body.currently.humidity,
             summary: body.daily.data[0].summary,
             time: body.currently.time,
             windSpeed:body.currently.windSpeed

           
         })
        }
    

        

    
        
    })
}

module.exports = forecast



        
    

