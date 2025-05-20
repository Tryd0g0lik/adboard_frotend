/**
 * src\scripts\index.ts
 */
import { formPage } from "./handlers/HandlerFormAd";
import asyncPublicAllAd from "src/scripts/services/taskPublicAllAd";
import { asyncGetListenerEvent, asyncHandlerOneAdPublic } from "src/scripts/handlers/handlerSingleAd/handleRequsetReceiveAd";
import asyncTaskPublicOneAd from "./services/taskPublicOnAd";
import { handlerUserForm } from "./handlers/handlerFormUsers/handlerRegisterForm";
// LISTENER CLICK BY FORM's SUBMIT BUTTOM

document.removeEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("register")) {
    asyncGetListenerEvent("keydown", handlerUserForm, undefined, "form-register");
  } else if (window.location.pathname.includes("login")) {
    asyncGetListenerEvent("keydown", handlerUserForm, undefined, "form-login");
  } else {
    formPage();
    // publicAllAd - public all ads in HTML
    Promise.all([asyncPublicAllAd(), asyncGetListenerEvent("click", asyncHandlerOneAdPublic, undefined, undefined), asyncTaskPublicOneAd()]);
  }

   });
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("register")) {
    asyncGetListenerEvent("keydown", handlerUserForm, undefined, "form-register");
  } else if (window.location.pathname.includes("login")) {
    asyncGetListenerEvent("keydown", handlerUserForm, undefined, "form-login");
  } else {
    formPage();
    // publicAllAd - public all ads in HTML
    const idName = 'ads-collections';
    Promise.all([asyncPublicAllAd(), asyncGetListenerEvent("click", asyncHandlerOneAdPublic, undefined, idName), asyncTaskPublicOneAd()]);
  }
});
