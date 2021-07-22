const input = document.querySelector('#search');
const submit = document.querySelector('#submit');
const astroRow = document.querySelector('#astro');
const dayRow = document.querySelector('#day');
const content = document.querySelector('.content-container');

AOS.init();

// Animation Func
window.addEventListener('scroll', (e) => {
    if(window.pageYOffset > 150) {
        content.classList.add('transition');
    } else {
        content.classList.remove('transition');
    }
})

const apiURL = 'https://weatherapi-com.p.rapidapi.com/forecast.json';

// Get astrology out of API and append
const getAStro = (astro) => {
    const keys = Object.keys(astro);
    keys.forEach(prop => {
        const td = document.createElement('td');
        td.style.backgroundColor = '#25a244';
        td.style.color = '#fff';
        td.innerHTML = `
       <td><strong>${prop}</strong> : ${astro[prop]}</td>
       `   
        astroRow.append(td);
    })
};

// Get day out of API and append
const getDay = (day) => {
    const keys = Object.keys(day);
    keys.slice(0, 6).forEach(prop => {
        const td = document.createElement('td');
        td.style.backgroundColor = '#25a244';
        td.style.color = '#fff';
        td.innerHTML = `
        <td><strong>${prop}</strong> : ${day[prop]}</td>
        `
        dayRow.append(td);
    })
};

// Main function that runs when the page loads
const getWeather = async (url, meta) => {
    try {
        const req = await axios.get(url, meta);
        const data = req.data;
        const {current, forecast} = data;
        getAStro(forecast.forecastday[0].astro)
        getDay(forecast.forecastday[0].day)
    } catch (e) {
        console.error(e);
    }
}

// Our initializer
window.onload = () => {
    const options = {
        params: { q: `Pretoria` },
        headers: {
          'x-rapidapi-key': '63495e7466msh9d628fbd56b1a3ep10032cjsn4cf3ec066dc7',
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        } 
    };
    getWeather(apiURL, options);
}


  
