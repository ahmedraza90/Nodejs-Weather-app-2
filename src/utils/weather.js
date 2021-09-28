const got = require('got')

const weather = async(latitude,longtitude)=>{
  
  try {
    const response = await got('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longtitude+'&appid=c5cd0a7ef31140053f484f96e136a152', {responseType:'json'})
    return Promise.resolve({
      City     : response.body.name,
      Country  : response.body.sys.country,
      temp     : response.body.main.temp,
      forecast : response.body.weather[0].description
    })
        
  } catch (error) {//status codes, low level errors
    if(error.response.body.cod=='400'){
      return Promise.reject(error.response.body.message)
    }
    return Promise.reject('Network Error')
    }
 }


module.exports=weather
// weather('skjs',67.114544)
// .then((response)=>{
//   console.log(response)
// })
// .catch((err)=>{
//   console.log(err)
// })

