const got = require('got')

const geo_code = async(location)=>{
    if(!location){ return Promise.reject('Location is required')}
    try {
        
        const { body } = await got('https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiYWhtZWQ5MDkwIiwiYSI6ImNrc2dqOTVuejFmZTIydnAyeXo1MXU0cGQifQ.YbMhL6CEDBt0v1vSBFWepw&limit=1',{ responseType : 'json'})

        if(body.features.length===0){   return Promise.reject('Incorrect location')}


        return Promise.resolve({
            longtitude:body.features[0].center[0],
            latitude:body.features[0].center[1]
        })    
    } catch (error) {
        
        return Promise.reject('Network error')
    }

       
}

module.exports = geo_code
// geo_code()
// .then((res)=>{
//     console.log('kdkdkdkd')
//   })  
// .catch((err)=>{
//     console.log(err)
// })

