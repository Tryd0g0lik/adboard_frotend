/**
 * src\scripts\index.ts
 */
import {asyncGetListenerEvent} from "src/scripts/handleRequsetReceiveAd";
import { hendlerActionOfInput, subHandlerLines } from "./scripts/handlers/handlerWeatherform/hanlerSearchPlace";
import { handlerLoginLogout } from "@ADBoards-handlers/loginLogout";
const handlerCommmon = (): void => {
  if (window.location.pathname.includes("weather")) {
    handlerLoginLogout();
    asyncGetListenerEvent("input", hendlerActionOfInput, undefined, "search");
    asyncGetListenerEvent("click", subHandlerLines, undefined, "search");
  }
};

document.removeEventListener("DOMContentLoaded", handlerCommmon);
document.addEventListener("DOMContentLoaded", handlerCommmon);
