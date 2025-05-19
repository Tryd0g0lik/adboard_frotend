/**
 * src\scripts\services\taskPublicOnAd.ts
 */

import teskInsertOneAd from "src/scripts/services/taskCreateOneElement";
import { asyncHandlerRequestGetOneAd } from "src/scripts/handlers/handlerSingleAd/handlerGetOneAd";
import { AdLine } from "src/interfaces";
const asyncTaskPublicOneAd = async () => {
  // GET ID OF AD FROM THE URL
  const pathname = window.location.pathname;
  const index = pathname.split("/")[2];
  // GET DATA OF AD FROM THE SERVER
  const response = await asyncHandlerRequestGetOneAd('/api/v1/ads/', index);
  if (!response){
    console.error("The received data from server is invalid!");
    return;
  }
  const sectionHtml = document.getElementById("ad-page-container");
  if (!sectionHtml){
    console.error("The section HTML is invalid!");
    return;
  }
  // PUBLIC AD ON AD PAGE
  teskInsertOneAd((sectionHtml as HTMLElement), (response as { data: AdLine[]}).data[0]);
  const buttonHtml = document.querySelector(".ad-view-footer button");
  if (!buttonHtml) {
    return;
  }
  buttonHtml.remove();
};

export default asyncTaskPublicOneAd;
