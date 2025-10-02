function Sunrise({t1,t2}){
    return(
        <>
    <div className='section2'>
      <div className='sunrise'>
          <h2>SUNRISE</h2>
          <img  className="sun" src="sunriseicon.png"/>
          <p>Time :: {t1}</p>
      </div>
      <div className='sunset'>
           <h2>SUNSET</h2>
           <img className="sun" src="sunset.png"/>
           <p>Time :: {t2}</p>
      </div>
    </div>
        </>
    )
}
export default Sunrise;