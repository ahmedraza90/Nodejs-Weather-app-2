const got = require('got');

const geo_code = async (location) => {
	if(location==undefined){	return Promise.reject('Location is undefined')   }
	
	try {
		const response = await got('https://api.mapbox.com/geocoding/v5/mapbox.places/'+location+'.json?access_token=pk.eyJ1IjoiYWhtZWQ5MDkwIiwiYSI6ImNrc2dqOTVuejFmZTIydnAyeXo1MXU0cGQifQ.YbMhL6CEDBt0v1vSBFWepw&limit=1',{ responseType: 'json'});
		if(response.body.features.length==0){
			return Promise.reject('Incorret Location')
		}
		return Promise.resolve({
			longtitude: response.body.features[0].center[0],
			latitude: response.body.features[0].center[1]
		})
	} catch (error) {
		return Promise.reject('Network Error')
		//=> 'Internal server error 
	}
}
module.exports=geo_code
// geo_code('12212sscdvcfdv3')
// .then((res)=>{
//    console.log(res)
// })
// .catch((err)=>{
// 	console.log(err)
// })

