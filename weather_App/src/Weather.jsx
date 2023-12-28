import './weather.css'
import { useEffect, useState } from 'react';
import SevenDayForecast from './sevenDayForecast';

const WeatherApp = () => {

  const [cityName, setCityName] = useState()
  const [search, setSearch] = useState('Rajkot')
  const [weatherData, setWeatherData] = useState()
  const [showForecast, setShowForecast] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const url = `https://api.weatherapi.com/v1/forecast.json?q=${search}&days=7&key=dcc3c4c6304e462780a153042232812`;
        const response = await fetch(url)
        const jsonResopnse = await response.json()
        console.log(jsonResopnse);

        if (jsonResopnse.error) {
          setCityName(search)
          setWeatherData()
        } else {
          setCityName()
          setWeatherData(jsonResopnse);
        }
      } catch (error) {
        alert('Error Fetching Data', error)
        setCityName(search)
        setWeatherData()
      }
    };
    fetchApi()
  }, [search])

  const handleRetry = () => {
    setCityName()
    setWeatherData()
    setError()
  };



  return <>
    <div className="modal-dialog w-25">
      <div className="modal-content rounded-3 shadow">
        <div className="modal-body p-2 text-center">
          <h2 className="text-center fw-bolder ">Weather App</h2>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <div className='form control ms-5 me-5 d-flex'>
            <input
              type='search'
              placeholder='Enter city Name'
              className='form-control rounded-pill ps-3'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearch(e.target.value)
                }
              }}
            />

          </div>
        </div>


        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
            <button className="btn btn-link" onClick={handleRetry}>
              Retry
            </button>
          </div>
        ) :
          cityName ? <p>City Not Found</p> :
            (<div className='container-data-image'>
              <div className=''>
                <img className='img' src={weatherData?.current.condition.icon} />
                <p>{weatherData?.current.condition.text}</p>
              </div>
              <div className='City Name'>
                <h2 className='fw-bolder fs-1'>{weatherData?.location.name}</h2>
                <p>{weatherData?.location.region} ({weatherData?.location.country})</p>
              </div>
              <div>
                <h3>{weatherData?.current.temp_c} &#8451;</h3>
                <p>Min: {weatherData?.forecast?.forecastday[0]?.day?.mintemp_c} &#8451; |  Max: {weatherData?.forecast?.forecastday[0]?.day?.maxtemp_c}&#8451;</p>
              </div>
              <button className='btn btn-danger sticky-btn mb-3 position-relative translate-middle"'
                onClick={() => setShowForecast(!showForecast)}>Show Forecast</button>
            </div>
            )}
      </div>
    </div >


    {/* Forecast */}
    <div className='modal-content forcast' >
      {weatherData && <SevenDayForecast forecastData={weatherData.forecast.forecastday} show={showForecast} />
      }
    </div >
  </>
}


export default WeatherApp