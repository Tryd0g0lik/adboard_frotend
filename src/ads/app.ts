/**
 * src\scripts\index.ts
 */
import { formPage } from "@ADBS-handlers/HandlerFormAd";
import asyncPublicAllAd from "@ADS/scripts/services/taskPublicAllAd";
import { asyncGetListenerEvent, asyncHandlerOneAdPublic } from "src/scripts/handleRequsetReceiveAd";
import asyncTaskPublicOneAd from "@ADS/scripts/services/taskPublicOnAd";
const handlerCommmon = (): void => {
  // } else if (window.location.pathname.includes("weather")) {

  //   asyncGetListenerEvent("input", hendlerActionOfInput, undefined, "search");
  //   asyncGetListenerEvent("click", subHandlerLines, undefined, "search");

  formPage();
  // publicAllAd - public all ads in HTML
  const idName = 'ads-collections';
  Promise.all([asyncPublicAllAd(), asyncGetListenerEvent("click", asyncHandlerOneAdPublic, undefined, idName), asyncTaskPublicOneAd()]);

};

document.removeEventListener("DOMContentLoaded", handlerCommmon);
document.addEventListener("DOMContentLoaded", handlerCommmon);
