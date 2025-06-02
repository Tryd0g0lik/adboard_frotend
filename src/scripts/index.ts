/**
 * src\scripts\index.ts
 */
import { formPage } from "./handlers/HandlerFormAd";
import asyncPublicAllAd from "src/scripts/services/taskPublicAllAd";
import { asyncGetListenerEvent, asyncHandlerOneAdPublic } from "src/scripts/handlers/handlerSingleAd/handleRequsetReceiveAd";
import asyncTaskPublicOneAd from "./services/taskPublicOnAd";
import { handlerUserForm } from "./handlers/handlerFormUsers/handlerRegisterForm";
import { hendlerActionOfInput, subHandlerLines } from "./handlers/handlerWeatherform/hanlerSearchPlace";

const handlerCommmon = (): void => {
  if (window.location.pathname.includes("register")) {

    Promise.all([
      asyncGetListenerEvent("keydown", handlerUserForm, undefined, "form-login")
    ])
      .then((resolve) => {
        console.log(resolve);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (window.location.pathname.includes("login")) {
    asyncGetListenerEvent("keydown", handlerUserForm, undefined, "form-login");
  } else if (window.location.pathname.includes("weather")) {

    asyncGetListenerEvent("input", hendlerActionOfInput, undefined, "search");
    asyncGetListenerEvent("click", subHandlerLines, undefined, "search");
  } else {
    formPage();
    // publicAllAd - public all ads in HTML
    const idName = 'ads-collections';
    Promise.all([asyncPublicAllAd(), asyncGetListenerEvent("click", asyncHandlerOneAdPublic, undefined, idName), asyncTaskPublicOneAd()]);
  }
};

document.removeEventListener("DOMContentLoaded", handlerCommmon);
document.addEventListener("DOMContentLoaded", handlerCommmon);
