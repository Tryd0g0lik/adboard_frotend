/**
 * src\scripts\index.ts
 */
import { formPage } from "./handlers/HandlerFormAd";
import asyncPublicAllAd from "src/scripts/services/taskPublicAllAd";
import { asyncGetListenerEvent, asyncHandlerOneAdPublic } from "src/scripts/handlers/handlerSingleAd/handleRequsetReceiveAd";
import asyncTaskPublicOneAd from "./services/taskPublicOnAd";
// LISTENER CLICK BY FORM's SUBMIT BUTTOM

document.removeEventListener("DOMContentLoaded", () => {
   formPage();
  // publicAllAd - public all ads in HTML
  Promise.all([asyncPublicAllAd(), asyncGetListenerEvent(asyncHandlerOneAdPublic, undefined, undefined), asyncTaskPublicOneAd()]);
   });
document.addEventListener("DOMContentLoaded", () => {
   formPage();
  // publicAllAd - public all ads in HTML
  const idName = 'ads-collections';
  Promise.all([asyncPublicAllAd(), asyncGetListenerEvent(asyncHandlerOneAdPublic, undefined, idName), asyncTaskPublicOneAd()]);
   });
