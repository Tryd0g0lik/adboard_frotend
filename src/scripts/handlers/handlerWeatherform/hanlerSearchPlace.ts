/**
 * src\scripts\handlers\handlerWeatherform\hanlerSearchPlace.ts
 */
let inputSetTimout: NodeJS.Timeout | number = 0;
import { fetchRequestWeather } from "src/scripts/handlers/handlerWeatherform/weatherRequest";
type T = string;
type Item = Record<T, string | Number>;

async function handlerRequestSerachForm(event: InputEvent): Promise<unknown | Item[]> {
  try{
    const url = new URL('v1/search', 'https://geocoding-api.open-meteo.com/');
    
    const target = event.target as HTMLInputElement;
    url.searchParams.set('name', target.value);
    url.searchParams.append('language', 'ru');
    url.searchParams.set('format', 'json');
    const response = await fetch(url);
    if (!response.ok){
      return {"results": []};
    };
    const responseJson: unknown = await response.json();
    return responseJson as (typeof responseJson);
  } catch (e: unknown) {
    console.log('error', e);
    return { "results": [] };
  }
}

/**
 * Here, user enter a city's name to the searc form, he received a list of ceties.\
 *  This function  gets 'latitude', longitude' of one city when user \
 * make choice of one city from list cityes. 
 * Note: WITHOUT press by the 'Enter' keyboard button.
 * @param event 
 * @returns 
 */
export async function subHandlerLines(event: MouseEvent): Promise<unknown | Item | void> {
  
  const target = event.target as HTMLElement;
  if (target.tagName.toLowerCase() !== 'li' || !target.hasAttribute('data-lon')) {
    return;
  }
  
  const lon = target.getAttribute('data-lon') as string;
  const lat = target.getAttribute('data-lat') as string;
  (event.currentTarget as HTMLElement).querySelector("#search_suggest")?.remove();
  const params_ = {
    "latitude": lat,
    "longitude": lon,
    "hourly": "temperature_2m"
  };
  await fetchRequestWeather(params_);
  return params_;
}

/**
 * This function is a handler of input's event. Whenn user enter city name. \
 * After the input field, the list from names cities will be created.\
 * Everyone line contain a city anme and longitude, an latitude of city to the hmlt.
 * @param event 
 * @returns void
 */
async function handlerSearchForm(event: InputEvent): Promise<void> {
  const input = event.target as HTMLInputElement;
  // const currentTarget = event.currentTarget as HTMLInputElement;
  if (!input ) {
    return;
  }
  
  /** REQUEST API */
  const response = await handlerRequestSerachForm(event);
  /** CREATE LIST/ARRAY HTML */
  const divHtml = document.createElement('div');
  divHtml.setAttribute("id", "search_suggest");
  const ulHtml = document.createElement("ul");
  /** RECEIVE LEIST OF CITIES */

  for (let view of (response as Record<string, Array<Record<string, number | string>>>)["results"]) {
    const result = view as unknown as Item;
    console.log("ITEM: ", String(result));
    const liHtml = document.createElement("li");
    liHtml.setAttribute('data-lon', String(result['longitude']));
    liHtml.setAttribute('data-lat', String(result['latitude']));
    liHtml.setAttribute('data-country', String(result['country']));
    console.log("RESULT: ", result['name']);
    const text = `${result['name'] as string} ${result['admin1'] as string}`;
    liHtml.append(text);
    ulHtml.append(liHtml);
  };
  /** PUBLIC CITIES */
  divHtml.append(ulHtml);
  input.after(divHtml);
 
}

/**
 * This function is a handler of input event. 
 * It is a wrapper of handlerSearchForm function.
 * @param event InputEvent
 * @returns void
 */
export function hendlerActionOfInput(event: Event): void {
  
  if (event.type.toLowerCase() !== 'input'){
    return;
  }
  // const target = event.target as HTMLInputElement;
  
  event.stopPropagation();
  event.preventDefault();
  
  clearTimeout(inputSetTimout);
  inputSetTimout = setTimeout(() => {
    
    const searchSuggestHtml = document.getElementById('search_suggest');
    searchSuggestHtml?.remove();
    handlerSearchForm(event as InputEvent);
  }, 200);
}
