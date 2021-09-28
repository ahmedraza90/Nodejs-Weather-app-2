const slocation = document.querySelector('form')
const search    = document.querySelector('input')
const one_p     = document.querySelector('#one-p')
const two_p     = document.querySelector('#two-p')


slocation.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const loc =  search.value
    fetch(`/weather?location=${loc}`)
    .then((res)=>{
    res.json()
    .then((data)=>{
        if(data.error){
            console.log(data)
            return one_p.textContent = data.error
        }
        one_p.textContent = 'temperature: '+ data.temp
        two_p.textContent = 'forecast: '+ data.forecast
        console.log(data)
    
   })
})

})
