export class Weather {
  constructor(apikey) {
    this.apikey = apikey;
    this.unit = 'metric'; // Default unit
    this.query = "90210"; // Default query
  }

  async getWeather(query = this.query, unit = this.unit) {
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${this.apikey}&units=${unit}`;

    if (/^\d{5}$/.test(query)) {
      // If query is a 5-digit zip code
      url += `&zip=${query}`;
    } else if (!isNaN(query)) {
      // If query is a number, assume it's a city ID
      url += `&id=${parseInt(query)}`;
    } else if (query.includes(',')) {
      // If query matches the format for coordinates (latitude,longitude)
      const [lat, lon] = query.split(',');
      url += `&lat=${parseFloat(lon)}&lon=${parseFloat(lat)}`;
    } else {
      // Assume query is a city name
      url += `&q=${query}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    console.log(query)
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      city: data.name,
    };
  }
}
