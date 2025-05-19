/**
 * src\scripts\services\taskPublicAllAd.ts
 */
import { handlerGetAdsCollection } from "src/scripts/handlers/handlersAdsCollection/handlerRequestlCollection";
import { handlerReceivesData } from "../handlers/handlersAdsCollection/handlerReceiveNewAd";

/**
 * This function is responsible for requesting the collection of ads and publishing them in the HTML.
 * @returns void
 */
const publicAllAd = async (): Promise<void>  => {
  // REQUEST GET COLLECTION ADS
  const response = await handlerGetAdsCollection();
  if (!response) {
    console.error("Error fetching ads!");
    return;
  }
  // PUBLICT COLLECTION OF ADS ON HTML
  await handlerReceivesData(response["data"]);
};
export default publicAllAd;
