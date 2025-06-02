/**
 * src\scripts\handlers\handlersAdsCollection\handlerRequestlCollection.ts
 * */
const URL_HOST_FOR_API = process.env.URL_HOST_FOR_API || "localhost";
import type { AdLinesCollection } from "src/ads/interfaces";

/**
 * This function is download the collection of the ads from server.
 * @returns {data: AdLinesCollection} | void
 */
export async function asyncHandlerGetAdsCollection(): Promise<{ data: AdLinesCollection } | void> { 
  try{
    // REQUEST GET COLLECTION ADS
    const url = new URL(`${URL_HOST_FOR_API}/api/v1/ads`);
    const response = await fetch(url,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      console.error("The Ads downloads data invalid!");
      return;
    }
    // RESEIVING RESPONSE DATA IN JSON TYPE
    const responseData = await response.json() as string; 
    const data = JSON.parse(responseData) as { data: AdLinesCollection };
    return data;
  }catch (err){
    console.log(`Error: ${(err as Error).message}`);
  }
  return;
}
