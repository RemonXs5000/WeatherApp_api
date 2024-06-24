
// GlOBAL Variables/////////////

const CityInput = document.querySelector('#CityInput');
const SearchBtn = document.querySelector('#searchBtn');
const CloseBtn = document.querySelector('#closeBtn');
const lightBoxContainer = document.querySelector('.lightBoxContainer');
const currentDayDegree = document.querySelector('#currentDayDegree')
const currentDayStat  = document.querySelector("#currentDayStat")
const currentDayEmoji = document.querySelector('#currentWeatherEmoji');
const LastUpdate = document.querySelector('#Lastupdate')
const Country =document.querySelector('#Location');
const HighDegree = document.querySelector("#HighDegree");
const LowDegree =document.querySelector("#LowDegree");
const Rain = document.querySelector('#Rain');
const Humidity = document.querySelector('#Humidity');
const Uv = document.querySelector('#Uv');
const Wind = document.querySelector('#Wind');
const HourItemCards = document.querySelectorAll('.hour-card');
const DayItemCards = document.querySelectorAll('.day-card');
const DayItemDeg = document.querySelectorAll('#dayDeg');






// FUNCTIONS//////////////




async function GetData(city){
  let data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8d553d0713a14838a34135437241806&q=${city}&days=5&aqi=no&alerts=no
`).then(response => {
  // handles if response is invalid
    if(!response.ok){
      throw new Error('No City Was Found ReEnter City/Country Name ')
    }
    return response.json();
  })
  .catch(error =>{ lightBoxContainer.classList.replace('d-none','d-flex');})
  // Updates The Three Sections in Html 
  UpdateCurrentWeather(data);
  UpdateHourCards(data);
  updateDayCards(data)
}


function UpdateCurrentWeather(cityData){
  const {location:{name , country},current:{temp_c:currentdegree , humidity , uv ,wind_mph,last_updated}}  = cityData
  const weatherCondition = cityData.current.condition.text ; 
  const weatherEmoji =cityData.current.condition.icon
  console.log(weatherEmoji)
  const maxTemp  = cityData.forecast.forecastday[0].day.maxtemp_c;
  const minTemp  = cityData.forecast.forecastday[0].day.mintemp_c;
  const RainChance  = cityData.forecast.forecastday[0].day.daily_chance_of_rain;
  Country.textContent = `${name},${country}`;
  LastUpdate.textContent= last_updated ; 
  currentDayDegree.textContent = `${currentdegree} ° ` ; 
  currentDayStat.textContent = weatherCondition;
  currentDayEmoji.setAttribute('src',`https:${weatherEmoji}`);
  HighDegree.textContent = `${maxTemp} ° ` ; 
  LowDegree.textContent = `${minTemp} ° ` ; 
  Rain.textContent = `${RainChance} %`
  Wind.textContent = `${wind_mph} Mph ` ;
  Humidity.textContent =humidity;
  Uv.textContent = uv
}


function UpdateHourCards(cityData){
  // return today 24 hour array (need only 1st 5 of them)
  const hours = cityData.forecast.forecastday[0].hour; 
  for (let i = 0; i <= 4; i++) {
   HourItemCards[i].firstElementChild.textContent = hours[i].time.slice(-4) ;    
   HourItemCards[i].lastElementChild.textContent =  `${ hours[i].temp_c} ° ` ; ;    
  }
}

function updateDayCards(cityData){
  const days = cityData.forecast.forecastday; 
  console.log(days)
  for (let i = 0; i <= 2; i++) {
    DayItemCards[i].firstElementChild.textContent =days[i].date;
    DayItemDeg[i].textContent = days[i].day.avgtemp_c
    DayItemCards[i].lastElementChild.textContent =days[i].day.condition.text;
    
  }
}


// EVENT LISTENER/////////////////


// handles the Close Button in lightbox
CloseBtn.addEventListener('click',function(e){
    lightBoxContainer.classList.replace('d-flex','d-none');
})

// / handle if user click the search icon 
SearchBtn.addEventListener('click' , async function(){
  // handle if CityInput is empty 
if(CityInput.value == ""){
   lightBoxContainer.classList.replace('d-none','d-flex');
}else{
    city = CityInput.value ; 
    GetData(city);
}
})

// / handle if user click the Enter 
document.addEventListener('keypress',async function(e){
  if(e.key =='Enter'){
    if(CityInput.value == ""){
      lightBoxContainer.classList.replace('d-none','d-flex');
   }else{
       city = CityInput.value ; 
       GetData(city);
   }
  }
})







