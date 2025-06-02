/**
 * src\scripts\handlers\handlerWeatherform\weatherRequest.ts
 */
import { fetchWeatherApi } from 'openmeteo';
/**
 * This function is used to fetch weather data from the Open-Meteo API
 * @param params 
 */
// @ts-expect-error
export async function fetchRequestWeather(params) {
  const ulHtml = document.querySelector("#ads-collections .ads-views");
  // https://open-meteo.com/en/docs
  const url = "https://api.open-meteo.com/v1/forecast";
  const responses = await fetchWeatherApi(url, params);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = (responses)[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  // const timezone = response.timezone();
  // const timezoneAbbreviation = response.timezoneAbbreviation();
  // const latitude = response.latitude();
  // const longitude = response.longitude();

  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    hourly: {
      time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
        (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
      ),
      temperature2m: hourly.variables(0)!.valuesArray()!,
    },
  };
  (ulHtml as HTMLElement).innerHTML = '';
  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    console.log(
      weatherData.hourly.time[i].toISOString(),
      weatherData.hourly.temperature2m[i]
    );
    const newLineHtml = document.createElement('li');
    newLineHtml.textContent = `${weatherData.hourly.time[i].toISOString()}: ${weatherData.hourly.temperature2m[i]}`;
    (ulHtml as HTMLElement).append(newLineHtml);
    // ulHtml?.append()
    // teskInsertOneAd(ulHtml as HTMLUListElement,);
  }
}
