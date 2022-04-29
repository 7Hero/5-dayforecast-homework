import React, {useState} from 'react';
import WeatherPage from "./components/WeatherPage";
import { LocationContext, location } from "./context/locationContext";

const App = () => {

  const [loc, setLoc] = useState(location)
  return (
    <LocationContext.Provider value={[loc,setLoc]}>
      <WeatherPage/>
    </LocationContext.Provider>
  );
}

export default App;
