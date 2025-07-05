/**
 * src\scripts\handlers\handlersAdsCollection\handlerRequestlCollection.ts
 * */
import { URL_HOST_FOR_API } from "@ENV";
import type { AdLinesCollection } from "src/ads/interfaces";
import { handlerPressCheckboxRemoveAds } from "../handlerDeleteLineOfAdsCollection/handlerRemoveAds";

/**
 * This function is download the collection of the ads from server.
 * @returns {data: AdLinesCollection} | void
 */
export async function asyncHandlerGetAdsCollection(): Promise<{ data: AdLinesCollection } | void> { 
  try{
    // REQUEST GET COLLECTION ADS
    const url = new URL(`${URL_HOST_FOR_API}/api/v1/ads/index/`);
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
    handlerPressCheckboxRemoveAds();
    return data;
  }catch (err){
    console.log(`Error: ${(err as Error).message}`);
  }
  return;
}
