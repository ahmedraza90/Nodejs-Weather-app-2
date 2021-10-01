const weather = document.querySelector('form')
const search  = document.querySelector('input')
const p1      = document.querySelector('#one')
const p2      = document.querySelector('#two')
const p3      = document.querySelector('#three')
const h0      = document.querySelector('#h0')

weather.addEventListener('submit',(e)=>{
    e.preventDefault()
    const loc = search.value
    fetch('/weather?location='+loc)
    .then((res)=>{
        res.json()
        .then((dat)=>{
            console.log(dat)
            h0.textContent = 'Location: '+dat.city
            p1.textContent = 'weather: '+ dat.forecast
            p2.textContent = 'temperature: '+dat.temp
            p3.textContent = 'pressure:   '+dat.pressure
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})
