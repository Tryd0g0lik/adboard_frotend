/**
 * src\sripts\handlers\handlersAdsCollection\handlerReceiveNewAd.ts
 */
import type { AdLine, AdLinesCollection } from "src/ads/interfaces";
import teskInsertOneAd from "src/ads/scripts/services/taskCreateOneElement";
/**
 * This handler for publicate the one new ad or list of ads's collection in web-page.
 * @param content Adline's or AdLinesCollection data type. Default value is undefined.
 * @returns Promise boolean
 */
export async function asyncHandlerReceivesData(content: AdLine | AdLinesCollection | undefined = undefined): Promise<boolean> {
  if (!content) {
    /**
     * Дополнителььная функция request для запроса get получить  список ads
     */
    null;
    return true;
  }
  const collectionsHTML = document.querySelector("#ads-collections ul.ads-views") as HTMLElement;

  if (!collectionsHTML) {
    console.log("INVALID 'ads-collections'");
    false;
  } else {
    // RECEIVING HTML CONTENT FROM SERVER's/API's DATA
    if (!Array.isArray(content)) {
      teskInsertOneAd(collectionsHTML, content as AdLine);
    } else (
      content.forEach((item) => {
        teskInsertOneAd(collectionsHTML, item as AdLine);
      })
    );
  }
  // ulHtml
  return true;
};

