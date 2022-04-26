import { DateTime } from "luxon";
import { IDailyWeather } from "../interfaces/global";
import * as WeatherIcons from "../assets/index.js";

export function getTimestamp(date: number) {
    return DateTime.fromSeconds(date).toFormat("LLLL dd',' t")
}
export function getDay(date: number) {
    return DateTime.fromSeconds(date).toFormat("cccc")
}
export function selectIcon(weather: IDailyWeather["weather"][0]) {

    const iconids = {
        200: WeatherIcons.ThunderstormIcon,
        300: WeatherIcons.RainIcon,
        500: WeatherIcons.RainIcon,
        520: WeatherIcons.ShowerRainIcon,
        600: WeatherIcons.SnowIcon,
        700: WeatherIcons.MistIcon,
        800: WeatherIcons.ClearSkyIcon,
        801: WeatherIcons.FewCloudsIcon,
        802: WeatherIcons.ScatteredCloudsIcon,
        803: WeatherIcons.BrokenCloudsIcon,
    }

    if(weather.id < 300) {
        return iconids[200]
    }
    if(weather.id < 502) {
        return iconids[300]
    }
    if(weather.id < 600) {
        return iconids[520]
    }
    if(weather.id < 600) {
        return iconids[500]
    }
    if(weather.id < 700) {
        return iconids[600]
    }
    if(weather.id < 800) {
        return iconids[700]
    }
    if(weather.id === 800) {
        return iconids[800]
    }
    if(weather.id === 801) {
        return iconids[801]
    }
    if(weather.id === 802) {
        return iconids[802]
    }
    if(weather.id === 803) {
        return iconids[803]
    }
    return iconids[800]
}