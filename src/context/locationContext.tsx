import { createContext} from 'react';

type Location = {
  lat: number;
  lon: number
}
export const location: Location = { lat: 47.0056, lon: 28.8575 };
const setLocation = (value: Location): void => {
  location.lat = value.lat;
  location.lon = value.lon;
};

export const LocationContext = createContext<[Location,Function]>([location,setLocation]);

