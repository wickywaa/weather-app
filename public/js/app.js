

const weatherSearchform = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const messageTwo1 = document.querySelector('#message-two-a')


messageOne.textContent=''
messageTwo.textContent =''
messageTwo1.textContent = ''

weatherSearchform.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const location = search.value


  
   
    messageOne.textContent = 'Loading Data'
     fetch('http://localhost:3000/weather?address='+location).then((response)=>{


    response.json().then((data)=>{
    if(data.error){
        messageOne.textContent= data.error
        messageTwo.textContent = ''
        messageTwo1.textContent = ''
        console.log(data.error)
    
      }else{
          
          messageTwo.textContent = data.address 
          messageTwo1.textContent = data.summary
          messageOne.textContent = ''
          console.log(data.address)
          console.log(data.summary)
      }
})
})
})



