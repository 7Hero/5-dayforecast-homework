import React, {useContext, useEffect, useId, useMemo, useReducer, useRef, useState} from "react";

import {getTimestamp, getDay, selectIcon} from "../utils/weather";
import { IDailyWeather } from "../interfaces/global";
import WeatherService from '../services/weather.service';
import WeatherCard from "./WeatherCard";
import { SearchIcon } from "../assets";
import './WeatherPage.scss';
import {LocationContext} from "../context/locationContext";

const Delay = ({delay,children}: any ) => {
    return (

        <div style={{animation:'appear ease-out 300ms backwards',animationDelay: `${delay}ms`}}>
            {children}
        </div>
    )
}

interface State {
    currentLocation: string | null;
    searchTerm: string;
    isLoading: boolean;
    locationList: any[]; // TODO
}
interface Action {
    type: 'setSearchTerm' | 'setLocation' | 'setIsLoading' | 'setLocationList';
    payload: any;
}

function reducer(state: State, action: Action) {
    switch(action.type) {
        case 'setSearchTerm':
            return {...state, searchTerm: action.payload};
        case 'setIsLoading':
            if(action.payload) {
                return {...state, locationList: [], isLoading: true};
            }
            return {...state, isLoading: false};
        case 'setLocationList':
            return {...state, locationList: action.payload};
        default:
            return state;
    }
}

const debounce = (fn: Function, wait: number): Function => {
    let timeoutId: NodeJS.Timeout;
    return function(...args: any) {
        return new Promise((resolve) => {
            if(timeoutId){
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                resolve(fn(...args));
            }, wait);
        });
    }
} // to another file.
const service = new WeatherService('70076f603d64ae552d02d9dca22f2e36'); // will have to do something.

const WeatherPage : React.FC = () => {
    const id = useId()
    const weatherService = useRef<WeatherService>();
    const [weather, setWeather] = useState<IDailyWeather[] | null>(null);
    const [state, dispatch] = useReducer(reducer, {currentLocation: null, locationList: [], isLoading: false,searchTerm: ''});
    const debounceSearch = useMemo(() => debounce(service.searchLocation.bind(service),1000) ,[]);
    const [ location, setLocation] = useContext(LocationContext);
    const handleSearch = ( e:any ) => {
        dispatch({type: 'setSearchTerm', payload: e.target.value});
    }
    useEffect( () => {
        if(state.searchTerm.length > 2) {
            dispatch({type: 'setIsLoading', payload: true});
            debounceSearch(state.searchTerm).then( ({data}: any) => {
                dispatch({type: 'setLocationList', payload: data.list});
                dispatch({type: 'setIsLoading', payload: false});
            });
        }
        console.log(state)
    }, [state.searchTerm])

    useEffect(() => {
        weatherService.current = new WeatherService('70076f603d64ae552d02d9dca22f2e36')
        weatherService.current.getFiveDayForecast().then( data => {
        setWeather(data.data.daily);
        })
    },[])
    return (
        <div>
            <div className='flex'>
                <div className='search'>
                    <label htmlFor={id}>Choose another location</label>
                    <div className='input'>
                    <SearchIcon/>
                    <input id={id} value={state.searchTerm} onChange={handleSearch}/>
                    </div>
                    <div className='relative'>
                        <div className='dropdown'>
                            {state.locationList.map((el: any) => <div key={el.id}>{el.name}</div>)}
                        </div>
                    </div>
                </div>
            </div>
            <p className='title' style={{textAlign:'center',padding:'100px' +
                  ' 0px'}}>5-Day <span className='bold'>Weather</span> Forecast</p>
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