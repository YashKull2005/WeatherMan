import React, { useState } from 'react';
import Weather from './Weather';
import Dashboard from './Dashboard';



function App() {
  const [city, setCity] = useState('Delhi');
  const [showDashboard,setShowDashboard]=useState(false);
  return <>
  <div className='navbar'>
    <div className='Weather' >WeatherMan</div>
    <div className='Home'  onClick={()=>setShowDashboard((prev)=>(!prev))}>
      <div>{!showDashboard?<img  src="Dashboard.png" alt="" />:<img src="home.png" alt="" />}</div>
      <div>{!showDashboard?"Dashboard":"Home"}</div>
    </div>
  </div>
  {showDashboard?(<><Dashboard city={city}/></>):<Weather city={city} setCity={setCity} />}
  
  </>;
  
}

export default App;
