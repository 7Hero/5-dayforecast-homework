import React, { useId } from "react";
import {SearchIcon} from "../assets";

const Search: React.FC = () => {
  const id = useId();
  return (
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
  )
}

export default Search;