import axios from 'axios';
import { Location } from '../context/locationContext'
export default class WeatherService {
    private url: URL = new URL('https://api.openweathermap.org/data/2.5/onecall?cnt=5&exclude=hourly,minutely')
    private searchUrl: URL = new URL('https://openweathermap.org/data/2.5/find?&type=like&sort=population&cnt=30&appid=439d4b804bc8187953eb36d2a8c26a02')

    constructor(key: string, units: string = 'metric') {
        this.url.searchParams.append('lat','47.0056')
        this.url.searchParams.append('lon','28.8575')
        this.url.searchParams.append('appid',key)
        this.url.searchParams.append('units',units)
    }
    getFiveDayForecast(location: Location) {
        this.url.searchParams.set('lat',String(location.lat));
        this.url.searchParams.set('lon',String(location.lon));
        return axios.get(this.url.href);
    }
    searchLocation(location: string) {
        const url = this.searchUrl;
        url.searchParams.append('q',location)
        return axios.get(url.href);
    }
}
