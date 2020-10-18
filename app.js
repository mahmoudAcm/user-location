// es-5 style for simlicity and no use of babel

/** 
 * @description cheeks if navigator is supported and gets lat and long
 * @returns a promise with coords
*/
const getCoords = function(){
    return new Promise(function(resolve, reject){
        if(!window.navigator){
            rejecet('navigator is not supported.');
            return;
        }

        window.navigator.geolocation.getCurrentPosition(function(position) {
            resolve(position.coords); 
        }, function(error){
            reject(error);   
        });
    });
};

/**
 * @description getting location of a user
 * @function getCoords
 * @returns a promise with user location
 */
const getLocation = async function(){
    //use api here to get location using coords and api key if needed.
    //replace your apiKey here
    const apiKey = "";
    try {
       const coords = await getCoords();
       const url = `https://api.opencagedata.com/geocode/v1/json?q=${coords.latitude}+${coords.longitude}&key=${apiKey}`;
       const data = await fetch(url).then(function(res){return res.json()});
       return data.results[0].components;
    } catch(error) {
       console.log(error);     
    }
};

getLocation().then(function(data){
    console.log(data);
});