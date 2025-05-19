/**
 * src\scripts\services\taskPublicAllAd.ts
 */
import { asyncHandlerGetAdsCollection } from "src/scripts/handlers/handlersAdsCollection/handlerRequestlCollection";
import { asyncHandlerReceivesData } from "../handlers/handlersAdsCollection/handlerReceiveNewAd";

/**
 * This function is responsible for requesting the collection of ads and publishing them in the HTML.
 * @returns void
 */
const asyncPublicAllAd = async (): Promise<void> => {
  // REQUEST GET COLLECTION ADS
  const response = await asyncHandlerGetAdsCollection();
  if (!response) {
    console.error("Error fetching ads!");
    return;
  }
  // PUBLICT COLLECTION OF ADS ON HTML
  await asyncHandlerReceivesData(response["data"]);
};
export default asyncPublicAllAd;
