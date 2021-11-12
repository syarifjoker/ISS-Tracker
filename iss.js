//element needed
let latitudeText = document.querySelector('.latitude');
let longitudeText = document.querySelector('.longitude');
let timeText = document.querySelector('.time');

//Map Display
const mymap = L.map('map').setView([0, 0], 1);
const issicon = L.icon({
    iconUrl: './iss.png',
    iconSize: [90, 45],
    iconAnchor: [25, 94],
    popupAnchor: [20, -86]
});
const marker = L.marker([0, 0], { icon: issicon }).addTo(mymap);

const tileUrl = 'https:{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetmap</a> contributors'
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

//ISS Tracker API
const iss_url = 'https://api.wheretheiss.at/v1/satellites/25544';
async function getISS() {
    //fetch ISS data API
    const response = await fetch(iss_url);
    const data = await response.json();
    const { latitude, longitude, timestamp } = data;

    //converting text
    const lat = data.latitude.toFixed(2);//latitude
    const lon = data.longitude.toFixed(2);//longitude
    const tt = new Date(data.timestamp * 1000).toUTCString(); //timestamp
    
    updateISS(lat, lon, tt);
    marker.setLatLng([latitude, longitude]);

}

async function updateISS(lat, lon, tt) {

    latitudeText.innerText = lat;
    longitudeText.innerText = lon;
    timeText.innerText = tt;

}

getISS();

setInterval(getISS, 1000);