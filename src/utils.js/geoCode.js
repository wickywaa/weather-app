const request = require('request')


geoCode = (address, callback)=>{

    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'%20.json?access_token=pk.eyJ1IjoiZ2F2bmV3dG9uODcxIiwiYSI6ImNrNXU1a2Q3dDEycXYzb3BiZndyZHlla2sifQ.QErPIbGKA3rVRgI4jmB1GQ&limit=1'
    
    
    request ({url,json:true},(error,{body})=>{
        if (error){
            callback('error unable to connect to location services', undefined)
        }else if(body.message === 'Not Found' || body.features.length === 0){
            callback('unable to find location try  another search', undefined)

        }else{
            callback(undefined, {


                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                cityDetails : body.features[0].place_name
            })
            

        }

        
    })
}


module.exports = geoCode