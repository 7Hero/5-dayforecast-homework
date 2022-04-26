import axios from 'axios';
export default class WeatherService {
    private url: URL = new URL('https://api.openweathermap.org/data/2.5/onecall?cnt=5&exclude=hourly,minutely')
    readonly href: string;
    constructor(key: string, units: string = 'metric') {
        this.url.searchParams.append('lat','47.0056')
        this.url.searchParams.append('lon','28.8575')
        this.url.searchParams.append('appid',key)
        this.url.searchParams.append('units',units)
        this.href = this.url.href;
    }

    getFiveDayForecast() {
        return axios.get(this.href);
    }
}
