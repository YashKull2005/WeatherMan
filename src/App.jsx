import React, { useState } from 'react';
import Weather from './Weather';
import Dashboard from './Dashboard';


function App() {
  const [city, setCity] = useState('Delhi');
  const [showDashboard,setShowDashboard]=useState(false);
  return <>
  <div className='navbar'>
    <div>WeatherMan</div>
    <div  onClick={()=>setShowDashboard((prev)=>(!prev))}>{!showDashboard?"Dashboard":"Home"}</div>
  </div>
  {showDashboard?<Dashboard city={city}/>:<Weather city={city} setCity={setCity} />}</>;
}

export default App;
