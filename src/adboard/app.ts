	/**
 * src\scripts\index.ts
 */
import { asyncGetListenerEvent } from "src/scripts/handleRequsetReceiveAd";
import { handlerUserForm } from "./scripts/handlers/handlerFormUsers/handlerRegisterForm";

const handlerCommmon = (): void => {
  if (window.location.pathname.includes("login")) {
    asyncGetListenerEvent("keydown", handlerUserForm, undefined, "form-login");
  }
};

document.removeEventListener("DOMContentLoaded", handlerCommmon);
document.addEventListener("DOMContentLoaded", handlerCommmon);
