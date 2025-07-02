/**
 * src\scripts\index.ts
 */
import { formPage } from "@ADBS-handlers/HandlerFormAd";
import asyncPublicAllAd from "@ADS/scripts/services/taskPublicAllAd";
import { asyncGetListenerEvent, asyncHandlerOneAdPublic } from "src/scripts/handleRequsetReceiveAd";
import asyncTaskPublicOneAd from "@ADS/scripts/services/taskPublicOnAd";
// import deleteCheckboxOfAd from "@ADS/scripts/services/taskDeleteCheckboxOfAdPage";
import { taskChangeIdDOM } from "@ADS/scripts/services/taskChangeId";
import taskAddButton from "@ADS/scripts/services/taskAddButton";
import { handlerPressCheckboxRemoveAds } from "./scripts/handlers/handlerDeleteLineOfAdsCollection/handlerRemoveAds";
const handlerCommmon = (): void => {

  const formPagePromise = new Promise((resolve) => {
    formPage();
    resolve(true);
  });

  // publicAllAd - public all ads in HTML
  const idName = 'ads-collections';
  Promise.allSettled([taskChangeIdDOM(), formPagePromise, asyncPublicAllAd(),
  asyncGetListenerEvent("click", asyncHandlerOneAdPublic, undefined, idName),
  asyncTaskPublicOneAd(), taskAddButton()]);


  // deleteCheckboxOfAd

};

document.removeEventListener("DOMContentLoaded", handlerCommmon);
document.addEventListener("DOMContentLoaded", handlerCommmon);
