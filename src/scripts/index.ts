import { formPage } from "./handlers/HandlerFormAd";
import asyncPublicAllAd from "src/scripts/services/taskPublicAllAd";
import { asyncGetListenerEvent, asyncHandlerOneAdPublic } from "src/scripts/handlers/handlerSingleAd/handleRequsetReceiveAd";
// LISTENER CLICK BY FORM's SUBMIT BUTTOM
document.removeEventListener("DOMContentLoaded", () => {
   formPage();
  // publicAllAd - public all ads in HTML
  Promise.all([asyncPublicAllAd()]);
   });
document.addEventListener("DOMContentLoaded", () => {
   formPage();
  // publicAllAd - public all ads in HTML
  const idName = 'data-ad';
  Promise.all([asyncPublicAllAd(), asyncGetListenerEvent(asyncHandlerOneAdPublic, idName)]);
   });
