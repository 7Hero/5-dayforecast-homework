import { useEffect, useRef, useState } from "react";

import WeatherCard from "./WeatherCard";
import WeatherService from '../services/weather.service';
import {getTimestamp, getDay, selectIcon} from "../utils/weather";
import { IDailyWeather } from "../interfaces/global";

const Delay = ({delay,children}: any ) => {
    return (

        <div style={{animation:'appear ease-out 300ms backwards',animationDelay: `${delay}ms`}}>
            {children}
        </div>
    )
}

const WeatherPage = () => {
    const weatherService = useRef<WeatherService>();
    const [weather, setWeather] = useState<IDailyWeather[] | null>(null);
    useEffect(() => {
        weatherService.current = new WeatherService('70076f603d64ae552d02d9dca22f2e36')
        weatherService.current.getFiveDayForecast().then( data => {
            setWeather(data.data.daily);
        })
    },[])
    return (
        <div>
            <p className='title' style={{textAlign:'center',padding:'200px 0px'}}>5-Day <span className='bold'>Weather</span> Forecast</p>
            <div style={{display:'flex', width: '100%', justifyContent:'center',columnGap:'20px',rowGap:'60px',flexWrap:"wrap"}}>
                {
                    weather && <WeatherCard first condition={weather[0].weather[0].description} day='Today' temp={weather[0].temp} timestamp={getTimestamp(weather[0].dt)} Icon={selectIcon(weather[0].weather[0])} />
                }
                {
                    weather && weather.slice(1,5).map( (el,idx) => {
                        return   (
                            <Delay delay={idx*150+50} key={el.dt}>
                                <WeatherCard  condition={el.weather[0].description} day={getDay(el.dt)} temp={el.temp} timestamp={getTimestamp(el.dt)} Icon={selectIcon(el.weather[0])} />
                            </Delay>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default WeatherPage;