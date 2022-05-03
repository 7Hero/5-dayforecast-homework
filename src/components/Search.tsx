import React, {useCallback, useContext, useEffect, useId, useMemo, useReducer, useRef, useState} from "react";
import {LoadingIcon, SearchIcon} from "../assets";
import WeatherService from "../services/weather.service";
import {ILocation} from "../interfaces/global";
import {LocationContext} from "../context/locationContext";

interface  State {
  currentLocation: string | null;
  searchTerm: string;
  isLoading: boolean;
  locationList: any[]; // TODO
}
interface Action {
  type: 'setSearchTerm' | 'setLocation' | 'setIsLoading' | 'setLocationList' ;
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
    case 'setLocation':
      return {...state, currentLocation: action.payload};
    default:
      return state;
  }
}
const service = new WeatherService('70076f603d64ae552d02d9dca22f2e36'); // will have to do something.

const Search: React.FC = () => {
  const id = useId();
  const inputRef = useRef(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [state, dispatch] = useReducer(reducer, {currentLocation: 'Chisinau, MD', locationList: [], isLoading: false,searchTerm: ''});
  const debounce = useCallback((fn: Function, wait: number): Function => {
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
  }, []);
  const debounceSearch = useMemo(() => debounce(service.searchLocation.bind(service),1000) ,[]);
  const [_, setLocation] = useContext(LocationContext);
  const handleClickOutside = (event: any) => {
    //@ts-ignore
    if(!dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  }
  useEffect( () => {
    if(state.searchTerm.length > 1) {
      dispatch({type: 'setIsLoading', payload: true});
      debounceSearch(state.searchTerm).then( ({data}: any) => {
        dispatch({type: 'setLocationList', payload: data.list});
        dispatch({type: 'setIsLoading', payload: false});
      });
    }
  }, [state.searchTerm])
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  },[])
  // TODO:  Dropdown open and close state logic is still shit.
  const handleSearch = ( e:any ) => {
    dispatch({type: 'setSearchTerm', payload: e.target.value});
  }
  return (
    <div className='flex'>
      <div className='search'>
        <label htmlFor={id}>Choose another location</label>
        <div
          className='input'
          onChange={() => {
            if(dropdownRef.current && state.searchTerm.length > 2) {
              setDropdownVisible(true);
            }
          }}
          onFocus = {() => {
            if(state.locationList.length > 0) {
              setDropdownVisible(true);
            }
          }}
        >
          <SearchIcon/>
          <input ref={inputRef} id={id} value={state.searchTerm} onChange={handleSearch} />
        </div>
        <div className='relative'>
          <div ref={dropdownRef} className='dropdown' style={{
              height: state.isLoading
                ? `${36+8+8}px`
                : state.locationList.length === 0 ? `${+8+8+20}px`
                : `${state.locationList.length*26+8+8+6}px`,
              display: dropdownVisible ? 'flex' : 'none'
            }}>
            { state.isLoading ? <LoadingIcon/> :
             <div style={{overflow: 'hidden'}}>
              {
                state.locationList.length > 0
                ? state.locationList.map((el: ILocation,idx: number) =>
                    <div className='dropdown-item' key={el.id} onClick={() => {
                       setLocation({lat:state.locationList[idx].coord.lat,lon:state.locationList[idx].coord.lon})
                       if(dropdownRef.current){
                         dispatch({type: 'setLocation', payload: el.name+", "+el.sys.country});
                         setDropdownVisible(false);
                       }
                     }}>
                      <span className='country'>{el.name+', '+el.sys.country}</span>
                      <img alt={el.sys.country} height={12} src={`https://countryflagsapi.com/svg/${el.sys.country}`}/>
                      <span className='temp'>{Math.round(el.main.temp-273.15)}℃</span>
                      <span className='condition'>{el.weather[0].description }</span>
                    </div>
                  )
                : 'No results found'
              }
             </div>
            }
          </div>
        </div>
      </div>
      <p className='location'>{state.currentLocation}</p>
    </div>
  )
}

export default Search;