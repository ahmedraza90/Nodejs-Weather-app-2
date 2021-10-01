const got = require('got')

const weather = async(longtitude,latitude)=>{
    

    try {
        const wea_data = await got('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longtitude+'&appid=c5cd0a7ef31140053f484f96e136a152',{responseType: 'json'})
            return Promise.resolve({
            forecast    :wea_data.body.weather[0].description,
            temp        :wea_data.body.main.temp,
            pressure    :wea_data.body.main.pressure,
            humidity    :wea_data.body.main.humidity,
            city        :wea_data.body.name
        })

    } catch (error) {
        if (error.response.body.cod){
            return Promise.reject('Incorrect coordiates')
        }
        
        return Promise.reject('Network error')
    }
}

module.exports = weather
// weather(67.114544)
// .then((x)=>{
//  console.log(x)
// })
// .catch((err)=>{
//    console.log(err)
// })