import React from 'react';
import './SevenDayForecast.css'
const SevenDayForecast = ({ forecastData, show }) => {
  return (

    <div className={`seven-day-forecast ${show && 'slide-up'}`}>
      
      <div className="forecast-row  d-flex justify-content-center shadow gap-4 mt-1 ">

        {forecastData.map((days, index) => (
          <div key={index} className="forecast-day">
            <p>{days.date}</p>
            <img src={days.day.condition.icon} alt={days.day.condition.text} />
            <p>{days.day.avgtemp_c} &#8451;</p>
            <span>{days.day.condition.text}</span>
            <p className='minMaxTemp'>Min: {days.day?.mintemp_c} &#8451; |  Max:{days.day?.maxtemp_c}&#8451;</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SevenDayForecast;
 