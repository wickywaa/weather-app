

const weatherSearchform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const messageTwo1 = document.querySelector('#message-two-a')
const messageTwo2 = document.querySelector('#message-two-b')


messageOne.textContent=''
messageTwo.textContent =''
messageTwo1.textContent = ''
messageTwo2.textContent =''

weatherSearchform.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const location = search.value


  
   
    messageOne.textContent = 'Loading Data'
     fetch('/weather?address='+location).then((response)=>{


    response.json().then((data)=>{
    if(data.error){
        messageOne.textContent= data.error
        messageTwo.textContent = ''
        messageTwo1.textContent = ''
        messageTwo2.textContent = ''
        console.log(data.error)
    
      }else{
          
          messageTwo.textContent = data.address
          messageTwo1.textContent = data.summary
          messageTwo2.textContent = "Currently  the temperature is " + data.temp+" degrees " + " the windspeed is "+ data.windSpeed +"km/h"
          + " humidity is  "+ data.humidity+ " %" + " there is a " + data.chanceOfRain + " % chance of rain " 
          
          messageOne.textContent = ' '
          console.log(data.address)
          console.log(data.summary)
      }
})
})
})



            
            //  prec: body.currently.precipProbability,
            
   