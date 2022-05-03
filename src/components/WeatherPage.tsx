import React, {useContext, useEffect, useRef, useState} from "react";
import {getTimestamp, getDay, selectIcon} from "../utils/weather";
import { IDailyWeather } from "../interfaces/global";
import WeatherService from '../services/weather.service';
import WeatherCard from "./WeatherCard";
import './WeatherPage.scss';
import Search from "./Search";
import {LocationContext } from "../context/locationContext";

const Delay = ({delay,children}: any ) => {
    return (

        <div style={{animation:'appear ease-out 300ms backwards',animationDelay: `${delay}ms`}}>
            {children}
        </div>
    )
}

const WeatherPage : React.FC = () => {
    const weatherService = useRef<WeatherService>();
    const [weather, setWeather] = useState<IDailyWeather[] | null>(null);

    const [location] = useContext(LocationContext);

    useEffect(() => {
        weatherService.current = new WeatherService('70076f603d64ae552d02d9dca22f2e36')
        weatherService.current.getFiveDayForecast(location).then( data => {
        setWeather(data.data.daily);
        })
    },[location])
    return (
        <div>
            <Search/>
            <p className='title' style={{textAlign:'center',padding:'100px' +
                  ' 0px'}}>5-Day <span className='bold'>Weather</span> Forecast</p>

            <div style={{display:'flex', width: '100%', justifyContent:'center',columnGap:'20px',rowGap:'60px',flexWrap:"wrap"}}>
                {
                    weather && weather.slice(0,5).map( (el,idx) => {
                          if(idx ===0){
                            return <Delay delay={0} key={el.dt} >
                              <WeatherCard first condition={el.weather[0].description} day={getDay(el.dt)} temp={el.temp} timestamp={getTimestamp(el.dt)} Icon={selectIcon(el.weather[0])} />
                            </Delay>
                          } else{
                            return <Delay delay={idx*150+50} key={el.dt} >
                                <WeatherCard  condition={el.weather[0].description} day={getDay(el.dt)} temp={el.temp} timestamp={getTimestamp(el.dt)} Icon={selectIcon(el.weather[0])} />
                            </Delay>
                          }
                    })
                }
            </div>
        </div>
    )
}

export default WeatherPage;