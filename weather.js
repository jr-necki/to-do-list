const API_KEY="313d14b97db9d750baee86596eef2b9a";
const COORDS='coords';
const weather=document.querySelector(".js-weather");
function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function (response){
      return response.json();
    }).then(function(json){
        console.log(json);
        const temperature=json.main.temp;
        const place=json.name;
        const type=json.weather.main;
        let icon;
        if(type==="Clouds"){
            icon="☁";
        }else if(type==="Snow"){
            icon="☃";
        }else if(type==="Thunderstrom"){
            icon="⚡";
        }else if(type==="Sunny"){
            icon="🌞";
        }else{
             icon="🌧";
        }
        weather.innerText=`${icon} ${temperature}°C   ${place}`;
    });
}
function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}
function handleGeoSucces(position){
    const latitude=position.coords.latitude;
     const longitude=position.coords.longitude;
     const coordsObj={
         latitude,
         longitude
     };
     saveCoords(coordsObj);
     getWeather(latitude,longitude);
}
function handleGeoError(){
    console.log("Can't access");
}
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError);
}
function loadCoords(){
    const loadedCoords=localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    }else{
        const parseCoords=JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}
function  init(){
    loadCoords();

}

init();